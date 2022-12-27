import { Article, ArticleTag, ArticleUser } from '@prisma/client';

export type ArticleDTO = Article & ArticleUser & ArticleTag;
export const dummyArticles: ArticleDTO[] = [
  {
    id: '1',
    title: 'First article',
    articleId: '1',
    userId: '1',
    createdAt: new Date(),
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
  {
    id: '2',
    title: 'Second article',
    articleId: '2',
    userId: '1',
    createdAt: new Date(),
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
];
