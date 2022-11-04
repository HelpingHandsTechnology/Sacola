import { createRouter } from './context';
import superjson from 'superjson';

import { articleRouter, protectedExampleRouter } from './controllers/index';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('articles.', articleRouter)
  .merge('auth.', protectedExampleRouter);

export type AppRouter = typeof appRouter;

export { createContext } from './context';

export { prisma } from './prisma';

export { authOptions } from './authOptions';
