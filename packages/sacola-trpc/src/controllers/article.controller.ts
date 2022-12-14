import { trpc } from '../trpc';
import { z } from 'zod';
import { articleSchema } from '../schemas';
import { prisma } from '../prisma';
import { authMiddleware } from '../middlewares/auth.middleware';

export const articleRouter = trpc.router({
  getAll: trpc.procedure.use(authMiddleware).output(z.array(articleSchema)).query(async ({ ctx }) => {
    return await prisma.article.findMany({
      include: { tags: true },
      where: { userId: ctx.user.id }
    });
  }),
});
