import { IPage } from './page.model';
import { IProductTagVariant } from './product-tag-variant.model';
import { IProduct } from './product.model';

export interface IProductPage extends IPage<IProduct> {
  readonly tags: IProductTagVariant[];
}