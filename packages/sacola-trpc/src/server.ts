import { userRouter } from './controllers/user.controller';
import { articleRouter } from './controllers/article.controller';
import { trpc } from './trpc';

export const appRouter = trpc.router({
  user: userRouter,
  articles: articleRouter,
});

export type AppRouter = typeof appRouter;

export { createContext } from './context';
