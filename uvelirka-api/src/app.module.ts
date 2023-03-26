import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { ApiConfigService } from './config/api-config.service';
import { ApiConfigModule } from './config/api.config.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ApiConfigService,
      ): MongooseModuleFactoryOptions => {
        return {
          auth: {
            password: configService.get('MONGO_PASSWORD'),
            username: configService.get('MONGO_USERNAME'),
          },
          uri: configService.get('MONGO_URL'),
        };
      },
      inject: [ApiConfigService],
      imports: [ApiConfigModule],
    }),
    AuthModule,
    ProductModule,
    CatalogModule,
  ],
})
export class AppModule {}
