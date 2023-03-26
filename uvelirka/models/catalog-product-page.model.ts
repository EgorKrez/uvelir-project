import { IUser } from '../api/user.api';
import { ICatalog } from './catalog.models';
import { IProductPage } from './product-page.model';

export interface IProductPageFromCatalogProps {
  readonly catalog: ICatalog;
  readonly page: IProductPage;
  readonly currentUrl: string;
  readonly user: IUser;
}