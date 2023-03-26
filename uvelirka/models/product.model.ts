import { ICatalog } from './catalog.models';
import { IProductTag } from './product-tag.model';

export interface IProduct {
  readonly _id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly mediaUrls: string[];
  readonly catalog: ICatalog;
  readonly tags: IProductTag[];
}
