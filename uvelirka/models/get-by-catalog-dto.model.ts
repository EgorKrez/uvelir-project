import { ITag } from './tag.model';

export interface IGetByCatalogDto {
  readonly catalogId: string;
  readonly page: number;
  readonly limit: number;
  readonly tags: ITag[];
}