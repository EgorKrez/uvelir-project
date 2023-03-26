import { Module } from '@nestjs/common';
import { ApiConfigModule } from '../config/api.config.module';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [FileUploadService],
  imports: [ApiConfigModule],
  exports: [FileUploadService],
})
export class FileModule {
}