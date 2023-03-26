import { ICatalog } from '../../models/catalog.model';
import { IProduct } from '../../models/product.model';
import { ProductDocument } from '../product.schema';

export function asProduct(
  product: ProductDocument,
  catalog: ICatalog = null
): IProduct  {
  return {
    _id: product.id,
    name: product.name,
    description: product.description,
    catalog,
    mediaUrls: product.mediaUrls,
    price: product.price,
    tags: product.tags,
  }
}