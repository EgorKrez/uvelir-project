import { Module } from '@nestjs/common';
import { ApiConfigModule } from '../config/api.config.module';
import { FileModule } from '../file/file.module';
import { MongoModule } from '../mongo/mongo.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    FileModule,
    ApiConfigModule,
    MongoModule,
  ],
  controllers: [
    ProductController
  ],
  providers: [
    ProductService
  ],
})
export class ProductModule {
}