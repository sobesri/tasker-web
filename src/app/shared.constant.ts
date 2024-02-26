class SearchListRequest {
  limit: number;
  searchTerm: string;
  offset: number;

  constructor(limit: number, searchTerm: string, offset: number) {
    this.limit = limit;
    this.searchTerm = searchTerm;
    this.offset = offset;
  }
}

export { SearchListRequest };
