export interface Post {
  id: number;
  documentId: string;
  title: string;
  description: string;
  body: string;
  created_at: string;
  slug: string;
  locale: string;
  publishedAt: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}

export interface DataFromApi<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
