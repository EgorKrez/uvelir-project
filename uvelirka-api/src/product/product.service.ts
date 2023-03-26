import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Types } from 'mongoose';
import * as path from 'path';
import * as process from 'process';
import { ROOT_CATALOG_ID } from '../constants/catalog.constants';
import {
  DraftProductId,
  gemTagsForGeneration,
  materialTagsForGeneration,
  sizeTagsForGeneration,
} from '../constants/product.constants';
import { FileUploadService } from '../file/file-upload.service';
import { MediaFile } from '../models/image-file.model';
import { asProduct } from '../mongo/mappers/product.mapper';
import { MongoService } from '../mongo/mongo.service';
import { Product, ProductDocument } from '../mongo/product.schema';
import { randomItem, randomNumber, randomWords } from '../utils/random.utils';

const draftImageFilename = 'draft.jpg';
const draftImageBuffer = fs.readFileSync(path.join(process.cwd(), 'dist', 'assets', draftImageFilename));

@Injectable()
export class ProductService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly fileUploadService: FileUploadService,
  ) {
  }

  private async assertProduct(productId: string) {
    const product = await this.getModel(productId).findById(productId);

    if (!product) {
      throw new BadRequestException(`product with id ${productId} not found`);
    }

    return product;
  }

  private async assertCatalog(catalogId: string) {
    const catalog = await this.mongoService.CatalogModel.findById(catalogId);

    if (!catalog) {
      throw new BadRequestException(`catalog with id ${catalogId} not found`);
    }

    return catalog;
  }

  private getModel(productId: string) {
    return productId === DraftProductId
      ? this.mongoService.ProductDraftModel
      : this.mongoService.ProductModel;
  }

  private validateTagIndex(product: ProductDocument, tagIndex: number) {
    const min = 0;
    const max = product.tags.length - 1;

    if (tagIndex < min || tagIndex > max) {
      throw new BadRequestException(`tag index should be between ${min} and ${max}`);
    }
  }

  private validateMediaIndex(product: ProductDocument, mediaIndex: number) {
    const min = 0;
    const max = product.mediaUrls.length - 1;

    if (mediaIndex < 0 || mediaIndex > max) {
      throw new BadRequestException(`${mediaIndex} should be between ${min} and ${max}`);
    }
  }

  async getDraft() {
    const draft = await this.mongoService.ProductDraftModel.findOne();

    if (!draft) {
      return this.mongoService.ProductDraftModel.create({
        _id: DraftProductId,
        name: 'Черновик',
        description: 'Очень содержательное описание',
        tags: [
          {
            name: 'Материал',
            value: 'Золото',
          },
        ],
        price: 1000,
        catalog: null,
        mediaUrls: [
          await this.fileUploadService.uploadFileViaBuffer(draftImageFilename, draftImageBuffer),
        ],
      });
    }
  }

  async editTag(
    productId: string,
    tagIndex: number,
    tagName: string,
    tagValue: string,
  ) {
    const product = await this.assertProduct(productId);

    this.validateTagIndex(product, tagIndex);

    product.set(`tags.${tagIndex}.name`, tagName);
    product.set(`tags.${tagIndex}.value`, tagValue);

    await product.save();
  }

  async editName(productId: string, name: string) {
    if (!name) {
      throw new BadRequestException(`'${name}' is not valid name`);
    }

    if (name.length > 200) {
      throw new BadRequestException(`'${name}' name is too long`);
    }

    const product = await this.assertProduct(productId);

    product.set('name', name);

    await product.save();
  }

  async editMediaUrl(productId: string, mediaIndex: number, file: MediaFile) {
    const product = await this.assertProduct(productId);

    this.validateMediaIndex(product, mediaIndex);

    const mediaUrl = await this.fileUploadService.uploadFile(file);

    product.set(`mediaUrls.${mediaIndex}`, mediaUrl);

    await product.save();
  }

  async editDescription(productId: string, description: string) {
    if (!description) {
      throw new BadRequestException(`${description} is not valid description`);
    }

    if (description.length > 5000) {
      throw new BadRequestException(`'${description}' description is too long`);
    }

    await this.getModel(productId).findByIdAndUpdate(productId, {
      $set: {
        description,
      },
    });
  }

  async getProduct(id: string) {
    const product = await this.getModel(id).findById(id).populate('catalog');

    if (product.catalog) {
      const catalog = await this.mongoService.getCatalog(product.catalog.id);

      return asProduct(product, catalog);
    }

    return asProduct(product);
  }

  async addTag(productId: string, tagName: string, tagValue: string) {
    if (!tagName || tagName.length > 100) {
      throw new BadRequestException(`tag name length should be between 0 and 100`);
    }

    if (!tagValue || tagValue.length > 100) {
      throw new BadRequestException(`tag value length should be between 0 and 100`);
    }

    const product = await this.assertProduct(productId);

    product.tags.push({
      name: tagName,
      value: tagValue,
    });

    await product.save();
  }

  async removeTag(productId: string, tagIndex: number) {
    const product = await this.assertProduct(productId);

    if (product.tags.length === 1) {
      throw new BadRequestException('product must have at least one tag');
    }

    this.validateTagIndex(product, tagIndex);

    product.tags.splice(tagIndex, 1);

    await product.save();
  }

  async addMedia(productId: string, file: MediaFile) {
    const product = await this.assertProduct(productId);

    const mediaUrl = await this.fileUploadService.uploadFile(file);

    product.mediaUrls.push(mediaUrl);

    await product.save();
  }

  async removeImage(productId: string, mediaIndex: number) {
    const product = await this.assertProduct(productId);

    if (product.mediaUrls.length === 1) {
      throw new BadRequestException('product must have at least one media url');
    }

    this.validateMediaIndex(product, mediaIndex);

    product.mediaUrls.splice(mediaIndex, 1);

    await product.save();
  }

  async editCatalog(productId: string, catalogId: string) {
    const product = await this.assertProduct(productId);

    if (catalogId === ROOT_CATALOG_ID) {
      product.catalog = null;
    } else {
      product.catalog = await this.assertCatalog(catalogId);
    }

    await product.save();
  }

  async generateProducts(generation: string, size: number, files: MediaFile[]) {
    await this.mongoService.ProductModel.deleteMany({
      name: new RegExp(`^g-${generation}`),
    }).exec();

    const catalogs = await this.mongoService.CatalogModel.find().exec();

    const images = await Promise.all(
      files.map(file => this.fileUploadService.uploadFile(file)),
    );

    const products: Product[] = [];

    for (let i = 0; i < size; i++) {
      products.push({
        tags: [
          randomItem(materialTagsForGeneration),
          randomItem(gemTagsForGeneration),
          randomItem(sizeTagsForGeneration),
        ],
        name: `g-${generation} n${i} ${randomWords({ exactly: 3, join: ' ' })}`,
        description: randomWords({
          min: 20,
          max: 30,
        }).join(' '),
        catalog: randomItem(catalogs),
        mediaUrls: [
          randomItem(images),
          randomItem(images),
          randomItem(images),
        ],
        price: randomNumber(60, 3000),
      });
    }

    if (products.length) {
      await this.mongoService.ProductModel.insertMany(products);
    }
  }

  async publish() {
    const draft = await this.mongoService.ProductDraftModel.findOne();

    const product = await this.mongoService.ProductModel.create({
      ...draft.toObject(),
      _id: new Types.ObjectId(),
    });

    return product._id.toString() as string;
  }

  async editPrice(productId: string, price: number) {
    const product = await  this.assertProduct(productId);

    product.price = price;

    await product.save();
  }
}