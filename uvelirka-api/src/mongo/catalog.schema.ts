import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CatalogDocument = HydratedDocument<Catalog>;

@Schema()
export class Catalog {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Catalog.name })
  parent: Catalog;

  @Prop()
  imageUrl: string;

  @Prop()
  name: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);