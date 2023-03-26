export interface ICatalog {
  readonly imageUrl: string;
  readonly _id: string;
  readonly children: ICatalog[];
  readonly path: ICatalog[];
  readonly name: string;
}