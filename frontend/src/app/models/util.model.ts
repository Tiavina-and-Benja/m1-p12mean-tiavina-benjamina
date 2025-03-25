export interface PaginatedResult<T> extends Paginated {
  docs: T[];
}

export interface Paginated {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Paginator {
  currentPage: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalItems: number;
}