import { initTRPC } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';

export const trpc = initTRPC.context<Context>().create({
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
