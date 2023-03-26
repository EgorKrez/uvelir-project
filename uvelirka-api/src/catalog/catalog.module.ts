import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { MongoModule } from '../mongo/mongo.module';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [
    FileModule,
    MongoModule
  ],
  controllers: [
    CatalogController,
  ],
})
export class CatalogModule {}