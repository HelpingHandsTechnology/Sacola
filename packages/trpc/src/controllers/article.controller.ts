import { initTRPC } from '@trpc/server';
import { Context } from '../context';
import superjson from 'superjson';
import { z } from 'zod';
import { articleSchema } from '../schemas';

const t = initTRPC.context<Context>().create({
    /**
     * @see https://trpc.io/docs/v10/data-transformers
     */
    transformer: superjson,
    /**
     * @see https://trpc.io/docs/v10/error-formatting
     */
    errorFormatter({ shape }) {
      return shape;
    },
  });

export const articleRouter = t.router({
  getAll: t.procedure.output(z.array(articleSchema)).query(async ({ ctx }) => {
    return await ctx.prisma.article.findMany({
      include: { tags: true },
      // TODO: where: { userId: _ }
    });
  }),
});