import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { userRouter } from './controllers/user.controller';
import { articleRouter } from './controllers/article.controller';
import superjson from 'superjson';

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

export const appRouter = t.router({
  user: userRouter,
  articles: articleRouter
});

export type AppRouter = typeof appRouter;

export { createContext } from './context';