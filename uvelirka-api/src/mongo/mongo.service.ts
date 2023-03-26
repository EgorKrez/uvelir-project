import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ROOT_CATALOG_ID } from '../constants/catalog.constants';
import { ProductDraftCollection } from '../constants/schema.constants';
import { IProductPage } from '../models/product-page.model';
import { IProduct } from '../models/product.model';
import { ITag } from '../models/tag.model';
import { reduceTags } from '../utils/tag.utils';
import { Catalog, CatalogDocument } from './catalog.schema';
import { asCatalog } from './mappers/catalog.mapper';
import { PrimaryCatalog, PrimaryCatalogDocument } from './primary-catalog.schema';
import { Product, ProductDocument } from './product.schema';
import { User, UserDocument } from './user.schema';

const fs = require('fs');
const path = require('path');

interface IPaginationAggregation {
  readonly items: IProduct[];
  readonly totalItems: [{
    readonly total: number;
  }];
  readonly tags: {
    _id: ITag,
    count: number;
  }[];
}

@Injectable()
export class MongoService {
  constructor(
    @InjectModel(Product.name) readonly ProductModel: Model<ProductDocument>,
    @InjectModel(ProductDraftCollection) readonly ProductDraftModel: Model<ProductDocument>,
    @InjectModel(Catalog.name) readonly CatalogModel: Model<CatalogDocument>,
    @InjectModel(PrimaryCatalog.name) readonly PrimaryCatalogModel: Model<PrimaryCatalogDocument>,
    @InjectModel(User.name) readonly UserModel: Model<UserDocument>,
  ) {
  }

  public async getCatalog(catalogId: string) {
    const [{ children, catalog: [catalog] }] = await this.CatalogModel.aggregate([
      {
        $facet: {
          children: [
            {
              $match: {
                parent: new Types.ObjectId(catalogId),
              },
            },
          ],
          catalog: [
            {
              $match: {
                _id: new Types.ObjectId(catalogId),
              },
            },
            {
              $graphLookup: {
                from: 'catalogs',
                startWith: '$parent',
                connectFromField: 'parent',
                connectToField: '_id',
                as: 'path',
              },
            },
          ],
        },
      },
    ]);

    return asCatalog(catalog, children, catalog.path);
  }

  public async moveCatalog(catalogId: string, parentCatalogId: string) {
    const isRoot = parentCatalogId === ROOT_CATALOG_ID;

    if (!isRoot && !await this.CatalogModel.findById(parentCatalogId)) {
      throw new BadRequestException(`parent catalog '${parentCatalogId}' not found`);
    }

    await this.CatalogModel.findByIdAndUpdate(catalogId, {
      $set: {
        parent: isRoot ? null : new Types.ObjectId(parentCatalogId),
      },
    });
  }

  public async paginateWithCatalog(
    catalog: string,
    page: number,
    limit: number,
    tags: ITag[],
  ): Promise<IProductPage> {
    if (catalog !== null && !Types.ObjectId.isValid(catalog)) {
      throw new BadRequestException(`'${catalog}' catalog id is not valid`);
    }

    const tagsQuery = tags.length
      ? {
        tags: {
          $all: reduceTags(tags).map(tag => ({
            $elemMatch: {
              name: tag.name,
              value: {
                $in: tag.values,
              },
            },
          })),
        },
      }
      : {};

    const catalogQuery = catalog ? {
      catalog: new Types.ObjectId(catalog),
    } : {};

    const result = await this.ProductModel.aggregate([
      { $match: { ...catalogQuery } },
      {
        $facet: {
          items: [
            { $match: { ...tagsQuery } },
            { $skip: page * limit },
            { $limit: limit },
          ],
          totalItems: [
            { $match: { ...tagsQuery } },
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
              },
            },
          ],
          tags: [
            { $project: { t: '$tags' } },
            { $unwind: '$t' },
            {
              $group: {
                _id: {
                  name: '$t.name',
                  value: '$t.value',
                },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const aggregation: IPaginationAggregation = result[0];

    return {
      items: aggregation.items,
      page: page,
      limit: limit,
      total: Math.ceil((aggregation.totalItems[0]?.total || 0) / limit),
      tags: reduceTags(aggregation.tags.map(
        t => ({ name: t._id.name, value: t._id.value }),
      )),
    };
  }
}