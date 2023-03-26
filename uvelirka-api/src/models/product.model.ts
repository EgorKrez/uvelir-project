import { ICatalog } from './catalog.model';
import { ITag } from './tag.model';

export interface IProduct {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly catalog: ICatalog;
  readonly mediaUrls: string[];
  readonly tags: ITag[];
}