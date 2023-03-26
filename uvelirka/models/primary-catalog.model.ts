import { ICatalog } from './catalog.models';

export interface IPrimaryCatalog {
  readonly _id: string;
  readonly catalog: ICatalog;
}