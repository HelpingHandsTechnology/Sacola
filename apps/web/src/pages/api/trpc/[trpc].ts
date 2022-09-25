import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter, createContext } from '@sacola/trpc';

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
