import { Module } from '@nestjs/common';
import { ConfigModule as ProductionConfigModule } from '@nestjs/config';
import { ApiConfigService } from './api-config.service';

@Module({
  imports: [
    ProductionConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  providers: [
    ApiConfigService
  ],
  exports: [
    ApiConfigService
  ],
})
export class ApiConfigModule {
}