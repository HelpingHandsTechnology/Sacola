import { trpc } from '../trpc';
import { z } from 'zod';
import { articleSchema } from '../schemas';

export const articleRouter = trpc.router({
  getAll: trpc.procedure.output(z.array(articleSchema)).query(async ({ ctx }) => {
    return await ctx.prisma.article.findMany({
      include: { tags: true },
      // TODO: where: { userId: _ }
    });
  }),
});
