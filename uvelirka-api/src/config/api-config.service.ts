import { Injectable } from '@nestjs/common';
import { ConfigService as ProductionConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(
    private readonly productionConfig: ProductionConfigService,
  ) {
  }

  public get(name: string): string {
    return this.productionConfig.get(name);
  }
}