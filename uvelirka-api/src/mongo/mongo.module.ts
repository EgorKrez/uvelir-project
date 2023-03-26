import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDraftCollection } from '../constants/schema.constants';
import { Catalog, CatalogSchema } from './catalog.schema';
import { MongoService } from './mongo.service';
import { PrimaryCatalog, PrimaryCatalogSchema } from './primary-catalog.schema';
import { Product, ProductSchema } from './product.schema';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: ProductDraftCollection, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PrimaryCatalog.name, schema: PrimaryCatalogSchema }]),
  ],
  providers: [
    MongoService,
  ],
  exports: [
    MongoService,
  ],
})
export class MongoModule {
}