import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import z from 'zod';

import { User } from '@prisma/client';
import { mail } from '../mail';
import { authMiddleware } from '../middlewares/auth.middleware';
import { prisma } from '../prisma';
import { TaskSendSignInEmail } from '../services/mail';
import { trpc } from '../trpc';
import { SECONDS } from '../utils/constants';

export const userRouter = trpc.router({
  signUp: trpc.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      }),
    )
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, email } = input;

      try {
        const userExist = await prisma.user.findUnique({ where: { email } });

        if (userExist) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exist',
          });
        }

        await mail.sendMail({
          from: 'Sacola <thesacola@gmail.com>',
          to: `${name} <${email}>`,
          subject: 'Sacola SignUp',
          html: `Hello, ${name}, welcome :D`,
        });

        await prisma.user.create({
          data: {
            name,
            email,
            emailVerified: false,
          },
        });

        return { message: 'User Created' };
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ishi',
        });
      }
    }),
  signIn: trpc.procedure
    .input(z.object({ email: z.string().email() }))
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User not exist :(',
          });
        }

        // If the codeLastSent is less then 30 seconds ago, throw an error
        if (user.codeLastSent && new Date().getTime() - user.codeLastSent.getTime() < 30 * SECONDS) {
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: 'Wait 30 seconds to sed a new code',
          });
        }

        const code = String(Math.random()).slice(3, 9);
        await prisma.user.update({
          where: { email },
          data: {
            lastCode: code,
            codeLastSent: new Date(),
          },
        });

        await TaskSendSignInEmail(user, code);

        return { message: 'Email sended!' };
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ishi',
        });
      }
    }),
  verifyCode: trpc.procedure
    .input(z.object({ email: z.string().email(), code: z.string() }))
    .output(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { code, email } = input;

      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User not exist :(',
          });
        }

        if (code !== user.lastCode) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid Code',
          });
        }

        const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_SECRET || 'secret', {
          expiresIn: '7d',
        });

        return { token };
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ishi',
        });
      }
    }),
  getUserInfo: trpc.procedure
    .use(authMiddleware)
    .output(z.object({ name: z.string(), email: z.string().email() }))
    .query(({ ctx }) => {
      return { name: ctx.user.name, email: ctx.user.email };
    }),
});
