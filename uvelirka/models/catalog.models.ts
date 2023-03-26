export interface ICatalog {
  name: string;
  _id: string;
  imageUrl: string;
  children: ICatalog[];
  path: ICatalog[];
  parent: ICatalog | null;
}
