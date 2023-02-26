import { prisma } from '../prisma';

export const ArticleUserRepository = {
  findArticleUserByUserIdAndArticleId: async ({ userId, articleId }: { userId: string; articleId: string }) => {
    return await prisma.articleUser.findUnique({
      where: { userId_articleId: { userId, articleId } },
    });
  },
} as const;
