import { prisma } from '../prisma';

export const ArticleRepository = {
  findArticleByUrl: async (url: string) => {
    return await prisma.article.findUnique({
      where: { urlDomain: url },
    });
  },
} as const;
