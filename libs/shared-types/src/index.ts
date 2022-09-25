import { Article, Tags } from '@prisma/client';

export interface ArticleWithTags extends Article {
  tags: Tags[];
}
