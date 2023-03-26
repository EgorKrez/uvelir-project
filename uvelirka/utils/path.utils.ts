import { ICatalog } from '../models/catalog.models';
import background from '../public/background.png';

export const catalogPath = (catalogId: string) => `/catalog/${catalogId}`;

export const loginPath = '/login';

export const draftProductId = '000000000000000000000000';
export const createProductPath = `/product/${draftProductId}`;

export const ROOT_CATALOG_ID = 'root';

export const rootCatalog = catalogPath(ROOT_CATALOG_ID);

export const productPath = (productId: string) => `/product/${productId}`;

export const backgroundImage = (imageUrl: string) => `url(${imageUrl})`;


export const rootCatalogItem: ICatalog = {
  _id: ROOT_CATALOG_ID,
  imageUrl: background.src,
  name: 'Корневой каталог',
  children: [],
  path: [],
  parent: null,
};

export const createTagQuery = (name: string, value: string) => `${name}--${value}`;

export function addMultipleQueryParam(url: string, name: string, values: string[]): string {
  const urlObj = new URL(`https://a.com${url}`);

  for (let value of values) {
    urlObj.searchParams.append(name, value);
  }

  return `${urlObj.pathname}${urlObj.search}`;
}

export function addQueryParam(url: string, name: string, value: string) {
  const urlObj = new URL(`https://a.com${url}`);

  urlObj.searchParams.append(name, value);

  return `${urlObj.pathname}${urlObj.search}`;
}

export function removeQueryParam(url: string, name: string, value: string) {
  const urlObj = new URL(`https://a.com${url}`);

  const values = urlObj.searchParams.getAll(name).filter(v => v !== value);

  urlObj.searchParams.delete(name);

  for (let otherValue of values) {
    urlObj.searchParams.append(name, otherValue);
  }

  return `${urlObj.pathname}${urlObj.search}`;
}

export function hasQueryParam(url: string, name: string, value: string) {
  const urlObj = new URL(`https://a.com${url}`);

  return urlObj.searchParams.getAll(name).includes(value);
}

export const tagQueryParam = 'filters';
export const pathToCatalogPaginated = (catalogId: string, pageNumber: number, limit: number) => `${catalogPath(catalogId)}?page=${pageNumber}&limit=${limit}`;

export const ApiUrl = 'http://localhost:3000';

export const googleLoginPath = (from: string) => `${ApiUrl}/auth/google?from=${from}`;