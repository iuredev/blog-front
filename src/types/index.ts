export type PageType = "about" | "manual";

export interface Post {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    content: string;
    slug: string;
    locale?: string;
    publishedAt: string;
    categories: Category[];
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

export interface StrapiMedia {
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
}

export type ReactionType = 'like' | 'dislike' | 'love' | 'fire' | 'mindblown' | 'sad';

export interface ReactionCounts {
  counts: Record<ReactionType, number>;
  userReactions: ReactionType[];
}

export interface Global {
  photo?: StrapiMedia;
  ogImage?: StrapiMedia;
  currentFocus?: string;
  currentFocusUpdatedAt?: string;
  skills?: string[];
}

export interface Project {
    id: number;
    documentId: string;
    title: string;
    description: string;
    link: string;
    github?: string;
    technologies?: string[];
    cover?: StrapiMedia;
    createdAt?: string;
    updatedAt?: string;
    publishedAt: string;
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
