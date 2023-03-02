import z from 'zod';

import { authMiddleware } from '../middlewares/auth.middleware';
import { trpc } from '../trpc';

export const userRouter = trpc.router({
  getUserInfo: trpc.procedure
    .use(authMiddleware)
    .output(z.object({ name: z.string(), email: z.string().email(), username: z.string().nullable() }))
    .query(({ ctx }) => {
      return {
        name: ctx.user.name,
        email: ctx.user.email,
        username: ctx.user.username
      };
    }),
  updateUser: trpc.procedure
    .use(authMiddleware)
    .input(z.object({
      name: z.string(),
      username: z.string().nullable()
    }))
    .mutation(({ ctx, input }) => {
      ctx.user.name = input.name;
      ctx.user.username = input.username;
      return true;
    }
  )
});
