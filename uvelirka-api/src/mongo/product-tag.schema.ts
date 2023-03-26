import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ProductTag {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

export const ProductTagSchema = SchemaFactory.createForClass(ProductTag);

export type ProductTagDocument = HydratedDocument<ProductTag>;