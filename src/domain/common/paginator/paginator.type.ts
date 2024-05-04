export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IQueryDto<F = null> {
  readonly page: number;
  readonly itemsPerPage: number;
  readonly filters?: F | null;
  readonly sortBy?: [string, Order][];
}

export type QueryResponse<E, F = null> = {
  data: E[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy?: [string, Order][];
    filters?: F | null;
  };
};

export type PaginatorFunction = <E, F>(
  model: E,
  options?: IQueryDto<F>,
) => Promise<QueryResponse<E>>;

export interface IPaginatorService<E, F> {
  list(dto: IQueryDto<F>): Promise<QueryResponse<E, F>>;
}
