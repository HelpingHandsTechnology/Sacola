import { trpc } from './trpc';
import { userRouter } from './controllers/user.controller';
import { articleRouter } from './controllers/article.controller';
import { tagRouter } from './controllers/tag.controller';

export const appRouter = trpc.router({
  user: userRouter,
  articles: articleRouter,
  tags: tagRouter,
});

export type AppRouter = typeof appRouter;

export { createContext } from './context';
