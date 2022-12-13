import { trpc } from '../trpc';
import { z } from 'zod';
import { articleSchema } from '../schemas';
import { prisma } from '../prisma';

export const articleRouter = trpc.router({
  getAll: trpc.procedure.output(z.array(articleSchema)).query(async () => {
    return await prisma.article.findMany({
      include: { tags: true },
      // TODO: where: { userId: _ }
    });
  }),
});
