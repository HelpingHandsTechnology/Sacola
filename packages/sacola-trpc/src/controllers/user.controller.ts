import z from 'zod';

import { authMiddleware } from '../middlewares/auth.middleware';
import { trpc } from '../trpc';

export const userRouter = trpc.router({
  getUserInfo: trpc.procedure
    .use(authMiddleware)
    .output(z.object({ name: z.string(), email: z.string().email() }))
    .query(({ ctx }) => {
      return { name: ctx.user.name, email: ctx.user.email };
    }),
});
