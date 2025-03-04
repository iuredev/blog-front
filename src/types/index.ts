export type PageType = "about" | "manual";

export interface Post {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
  slug: string;
  locale?: string;
  publishedAt: string;
  category: Category;
}

export interface Page {
  content: string;
  createdAt: string;
  description: string;
  documentId: string;
  id: number;
  locale?: string;
  localizations?: [];
  publishedAt: string;
  title: string;
  updatedAt: string;
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
