export interface IPage<T> {
  readonly items: T[];
  readonly page: number;
  readonly limit: number;
  readonly total: number;
}