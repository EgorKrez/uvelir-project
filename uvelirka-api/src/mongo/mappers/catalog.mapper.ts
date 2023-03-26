import { ICatalog } from '../../models/catalog.model';
import { CatalogDocument } from '../catalog.schema';

export function asCatalog(
  catalogDocument: CatalogDocument,
  children: CatalogDocument[] = [],
  path: CatalogDocument[] = [],
): ICatalog {
  return {
    _id: catalogDocument._id.toString(),
    name: catalogDocument.name,
    children: children.map(c => asCatalog(c)),
    path: path.map(c => asCatalog(c)),
    imageUrl: catalogDocument.imageUrl,
  };
}