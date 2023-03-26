import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Catalog, CatalogDocument } from './catalog.schema';
import { ProductTag, ProductTagSchema } from './product-tag.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  mediaUrls: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Catalog.name })
  catalog: CatalogDocument;

  @Prop({ type: [ProductTagSchema] })
  tags: ProductTag[];

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
