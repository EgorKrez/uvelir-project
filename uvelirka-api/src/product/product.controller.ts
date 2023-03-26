import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ROOT_CATALOG_ID } from '../constants/catalog.constants';
import { FileUploadService } from '../file/file-upload.service';
import { IGetByCatalogDto } from '../models/get-by-catalog-dto.model';
import { MediaFile } from '../models/image-file.model';
import { IPage } from '../models/page.model';
import { IProduct } from '../models/product.model';
import { MongoService } from '../mongo/mongo.service';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly mongoService: MongoService,
    private readonly productService: ProductService,
  ) {
    this.productService.getDraft();
  }

  @Post('by/catalog')
  private async getByCatalog(
    @Body() { catalogId, page, limit, tags }: IGetByCatalogDto,
  ): Promise<IPage<IProduct>> {
    if (catalogId === ROOT_CATALOG_ID) {
      catalogId = null;
    }

    return await this.mongoService.paginateWithCatalog(catalogId, page, limit, tags);
  }

  @Post('generate/:generation/:size')
  @UseInterceptors(FilesInterceptor('files'))
  private async generate(
    @Param('generation') generation: string,
    @Param('size', new ParseIntPipe()) size: number,
    @UploadedFiles() files: MediaFile[],
  ) {
    await this.productService.generateProducts(generation, size, files);
  }

  @Get('one/:id')
  private async getOneProduct(
    @Param('id') id: string,
  ): Promise<IProduct> {
    return await this.productService.getProduct(id);
  }

  @Delete(':id')
  private async delete(
    @Param('id') id: string,
  ) {
    await this.mongoService.ProductModel.findByIdAndDelete(id);
  }

  @Put('edit/name/:productId/:name')
  private async editName(
    @Param('productId') productId: string,
    @Param('name') name: string,
  ) {
    await this.productService.editName(productId, name);
  }

  @Put('edit/name/:productId/:price')
  private async editPrice(
    @Param('productId') productId: string,
    @Param('price', new ParseIntPipe()) price: number,
  ) {
    await this.productService.editPrice(productId, price);
  }

  @Put('edit/description/:productId/:description')
  private async editDescription(
    @Param('productId') productId: string,
    @Param('description') description: string,
  ) {
    await this.productService.editDescription(productId, description);
  }

  @Put('edit/mediaUrl/:productId/:mediaIndex')
  @UseInterceptors(FileInterceptor('file'))
  private async editImage(
    @Param('productId') productId: string,
    @Param('mediaIndex', new ParseIntPipe()) mediaIndex: number,
    @UploadedFile() file: MediaFile,
  ) {
    await this.productService.editMediaUrl(productId, mediaIndex, file);
  }

  @Put('add/mediaUrl/:productId')
  @UseInterceptors(FileInterceptor('file'))
  private async addImage(
    @Param('productId') productId: string,
    @UploadedFile() file: MediaFile,
  ) {
    await this.productService.addMedia(productId, file);
  }

  @Put('remove/mediaUrl/:productId/:mediaIndex')
  private async removeImage(
    @Param('productId') productId: string,
    @Param('mediaIndex', new ParseIntPipe()) mediaIndex: number,
  ) {
    await this.productService.removeImage(productId, mediaIndex);
  }

  @Put('edit/tag/:productId/:tagIndex/:tagName/:tagValue')
  private async editTag(
    @Param('productId') productId: string,
    @Param('tagIndex', new ParseIntPipe()) tagIndex: number,
    @Param('tagName') tagName: string,
    @Param('tagValue') tagValue: string,
  ) {
    await this.productService.editTag(productId, tagIndex, tagName, tagValue);
  }

  @Put('add/tag/:productId/:tagName/:tagValue')
  private async addTag(
    @Param('productId') productId: string,
    @Param('tagName') tagName: string,
    @Param('tagValue') tagValue: string,
  ) {
    await this.productService.addTag(productId, tagName, tagValue);
  }

  @Put('remove/tag/:productId/:tagIndex')
  private async removeTag(
    @Param('productId') productId: string,
    @Param('tagIndex', new ParseIntPipe()) tagIndex: number,
  ) {
    await this.productService.removeTag(productId, tagIndex);
  }

  @Put('edit/catalog/:productId/:catalogId')
  private async editCatalog(
    @Param('productId') productId: string,
    @Param('catalogId') catalogId: string,
  ) {
    await this.productService.editCatalog(productId, catalogId);
  }

  @Post('publish')
  private async publish(): Promise<string> {
    return await this.productService.publish();
  }
}