import { createRouter } from './context';
import superjson from 'superjson';

import { protectedExampleRouter } from './protected-example-router';
import { articleRouter } from './article';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('articles.', articleRouter)
  .merge('auth.', protectedExampleRouter);

export type AppRouter = typeof appRouter;

export { createContext } from './context';
