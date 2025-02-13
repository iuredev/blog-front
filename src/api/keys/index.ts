interface Keys {
  POSTS: string;
  CATEGORIES: string;
  POSTS_BY_CATEGORY: string;
  POSTS_RELATED: string;
  POST_BY_SLUG: string;
}

export const keys: Record<keyof Keys, string> = {
  POSTS: "articles",
  POST_BY_SLUG: "article_by_slug",
  CATEGORIES: "categories",
  POSTS_BY_CATEGORY: "articles_by_category",
  POSTS_RELATED: "articles_related",
};
