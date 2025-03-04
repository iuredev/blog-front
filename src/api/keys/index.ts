interface Keys {
  POSTS: string;
  CATEGORIES: string;
  POSTS_BY_CATEGORY: string;
  POSTS_RELATED: string;
  POST_BY_SLUG: string;
  POSTS_PAGINATED: string;
  PAGES: string;
}

export const keys: Record<keyof Keys, string> = {
  POSTS: "articles",
  POSTS_PAGINATED: "articles_paginated",
  POST_BY_SLUG: "article_by_slug",
  CATEGORIES: "categories",
  POSTS_BY_CATEGORY: "articles_by_category",
  POSTS_RELATED: "articles_related",
  PAGES: "pages",
};
