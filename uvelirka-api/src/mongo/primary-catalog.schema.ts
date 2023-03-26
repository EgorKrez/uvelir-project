import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Catalog, CatalogDocument } from './catalog.schema';

export type PrimaryCatalogDocument = HydratedDocument<PrimaryCatalog>;

@Schema()
export class PrimaryCatalog {
  @Prop({ type: MongooseSchema.Types.ObjectId , ref: Catalog.name })
  catalog: CatalogDocument;
}

export const PrimaryCatalogSchema = SchemaFactory.createForClass(PrimaryCatalog);