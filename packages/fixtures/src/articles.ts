import { Article, ArticleTag, ArticleUser } from '@prisma/client';

// TODO: [Backend] Add image and short description field in article
interface TODO {
  image: string;
  shortDescription: string;
}

export type ArticleDTO = Article & ArticleUser & ArticleTag & TODO;
export const dummyArticles: ArticleDTO[] = [
  {
    id: '1',
    title: 'First article',
    articleId: '1',
    userId: '1',
    createdAt: new Date(),
    image: 'https://via.placeholder.com/250',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl velit, mollis eget mauris et, dignissim viverra dolor. Quisque nec sem nec metus venenatis pulvinar. ',
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
    image: 'https://via.placeholder.com/250',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl velit, mollis eget mauris et, dignissim viverra dolor. Quisque nec sem nec metus venenatis pulvinar. ',
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
  {
    id: '3',
    title: 'Third article',
    articleId: '3',
    userId: '1',
    createdAt: new Date(),
    image: 'https://via.placeholder.com/250',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl velit, mollis eget mauris et, dignissim viverra dolor. Quisque nec sem nec metus venenatis pulvinar. ',
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
  {
    id: '4',
    title: 'Fourth article',
    articleId: '4',
    userId: '1',
    createdAt: new Date(),
    image: 'https://via.placeholder.com/250',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl velit, mollis eget mauris et, dignissim viverra dolor. Quisque nec sem nec metus venenatis pulvinar. ',
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
  {
    id: '5',
    title: 'Fifth article',
    articleId: '5',
    userId: '1',
    createdAt: new Date(),
    image: 'https://via.placeholder.com/250',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl velit, mollis eget mauris et, dignissim viverra dolor. Quisque nec sem nec metus venenatis pulvinar. ',
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
  {
    id: '6',
    title: 'Sixth article',
    articleId: '6',
    userId: '1',
    createdAt: new Date(),
    image: 'https://via.placeholder.com/250',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl velit, mollis eget mauris et, dignissim viverra dolor. Quisque nec sem nec metus venenatis pulvinar. ',
    isFavorite: false,
    tagId: '1',
    urlDomain: 'https://example.com',
  },
];
