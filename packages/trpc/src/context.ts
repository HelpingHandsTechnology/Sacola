import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from './prisma';

export const createContext = (opts: trpcNext.CreateNextContextOptions) => {
    return { req: opts.req, res: opts.res, prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;