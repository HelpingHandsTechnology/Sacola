import { trpc } from './trpc';
import { userRouter } from './controllers/user.controller';
import { articleRouter } from './controllers/article.controller';
import { tagRouter } from './controllers/tag.controller';
import { authRouter } from './controllers/auth.controller';

export const appRouter = trpc.router({
  auth: authRouter,
  user: userRouter,
  articles: articleRouter,
  tags: tagRouter,
});

export type AppRouter = typeof appRouter;

export { createContext } from './context';
