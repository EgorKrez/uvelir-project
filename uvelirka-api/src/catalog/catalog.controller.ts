import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROOT_CATALOG_ID } from '../constants/catalog.constants';
import { FileUploadService } from '../file/file-upload.service';
import { ICatalog } from '../models/catalog.model';
import { MongoService } from '../mongo/mongo.service';
import { PrimaryCatalogDocument } from '../mongo/primary-catalog.schema';
import { randomNumber } from '../utils/random.utils';

interface ICreateCatalogDto {
  readonly parentId: string;
  readonly imageId: string;
  readonly name: string;
}

const cycleIndexing = <T>(items: T[], index: number): T => items[index % items.length];

@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly mongoService: MongoService,
    private readonly fileUploadService: FileUploadService,
  ) {
  }

  @Delete(':id')
  private async deleteCatalog(
    @Param('id') id: string,
  ) {
    return this.mongoService.CatalogModel.findByIdAndDelete(id);
  }

  @Get()
  private async getAll() {
    const catalogs = await this.mongoService.CatalogModel.find();

    return catalogs.reverse();
  }

  private async getOrCreatePrimaryCatalogs(): Promise<PrimaryCatalogDocument[]> {
    const primaryItems = await this.mongoService.PrimaryCatalogModel.find().populate({
      path: 'catalog',
      populate: {
        path: 'parent',
      },
    });

    if (primaryItems.length === 0) {
      const catalogs = await this.mongoService.CatalogModel.find().populate('parent');

      if (!catalogs.length) {
        throw new BadRequestException('catalogs must be initialized first');
      }

      const additionalPrimaryCatalogs: any[] = [];

      for (let i = 0; i < 12; i++) {
        additionalPrimaryCatalogs.push({
          catalog: cycleIndexing(catalogs, i),
        });
      }

      return await this.mongoService.PrimaryCatalogModel.insertMany(additionalPrimaryCatalogs) as any;
    }

    if (primaryItems.some(item => !item.catalog)) {
      const catalogs = await this.mongoService.CatalogModel.find().populate('parent');

      for (let primaryItem of primaryItems) {
        if (!primaryItem.catalog) {
          const usedCatalogs = primaryItems.map(item => item.catalog?.id).filter(Boolean);

          primaryItem.catalog = catalogs.find(c => !usedCatalogs.includes(c.id))
            || catalogs[randomNumber(0, catalogs.length - 1)];

          await primaryItem.save();
        }
      }
    }

    return primaryItems as any;
  }

  @Get('primary')
  private async getAllPrimary() {
    return this.getOrCreatePrimaryCatalogs();
  }

  @Post('primary/:primaryCatalogId/:catalogId')
  private async setPrimary(
    @Param('primaryCatalogId') primaryCatalogId: number,
    @Param('catalogId') catalogId: string,
  ) {
    const catalog = await this.mongoService.CatalogModel.findById(catalogId);

    if (!catalog) {
      throw new BadRequestException('catalog not found');
    }

    await this.mongoService.PrimaryCatalogModel.findByIdAndUpdate(primaryCatalogId, {
      $set: {
        catalog,
      },
    });

    return {};
  }

  @Put('edit/name/:catalogId/:name')
  private async editName(
    @Param('catalogId') catalogId: string,
    @Param('name') name: string,
  ) {
    if (!name) {
      throw new BadRequestException(`'${name}' name is invalid`);
    }

    await this.mongoService.CatalogModel.findByIdAndUpdate(catalogId, {
      $set: {
        name,
      },
    });
  }

  @Put('edit/image/:catalogId')
  @UseInterceptors(FileInterceptor('file'))
  private async editImage(
    @Param('catalogId') catalogId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.mongoService.CatalogModel.findByIdAndUpdate(catalogId, {
      $set: {
        imageUrl: await this.fileUploadService.uploadFile(file),
      },
    });
  }

  @Put('edit/move/:catalogId/:parentId')
  private async moveCatalog(
    @Param('catalogId') catalogId: string,
    @Param('parentId') parentId: string,
  ) {
    await this.mongoService.moveCatalog(catalogId, parentId);
  }

  @Get('one/root')
  private async getRootCatalog(): Promise<ICatalog> {
    return {
      _id: ROOT_CATALOG_ID,
      name: 'Корневой каталог',
      imageUrl: null,
      children: await this.mongoService.CatalogModel.find({ parent: null }),
      path: [],
    };
  }

  @Get('one/:catalogId')
  private async getPathTo(
    @Param('catalogId') catalogId: string,
  ): Promise<ICatalog> {
    return this.mongoService.getCatalog(catalogId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  private async create(
    @Body() createCatalogDto: ICreateCatalogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const parent = await this.mongoService.CatalogModel.findById(createCatalogDto.parentId);

    return await this.mongoService.CatalogModel.create({
      name: createCatalogDto.name,
      parent,
      imageUrl: await this.fileUploadService.uploadFile(file),
    });
  }
}