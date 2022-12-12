import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter, createContext } from 'sacola-trpc';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
