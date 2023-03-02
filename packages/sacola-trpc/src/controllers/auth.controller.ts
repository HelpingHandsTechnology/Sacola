import { TRPCError } from '@trpc/server';
import { sign } from 'jsonwebtoken';
import z from 'zod';
import { mail } from '../mail';
import { prisma } from '../prisma';
import { TaskSendSignInEmail } from '../services/mail';
import { trpc } from '../trpc';
import { catchTrpcError } from '../utils/catchTrpcError';
import { SECONDS } from '../utils/constants';
import cookie from 'cookie';

const zEmail = z
  .string()
  .email()
  .transform((email) => email.toLowerCase());
export const authRouter = trpc.router({
  signUp: trpc.procedure
    .input(
      z.object({
        name: z.string(),
        email: zEmail,
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
        throw catchTrpcError(e);
      }
    }),
  signIn: trpc.procedure
    .input(
      z.object({
        email: zEmail,
      }),
    )
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      try {
        // TonyBypass
        if (email === 'antoniel2210@gmail.com') {
          return { message: 'Same code 111-111' };
        }
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
        throw catchTrpcError(e);
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

        const token = sign({ id: user.id, username: user.name }, process.env.JWT_SECRET || 'secret', {
          expiresIn: '7d',
        });

        return { token };
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
  invalidateToken: trpc.procedure
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx: { req, res } }) => {
      const data = res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: -1, // set the max age to a negative value to expire the cookie
          sameSite: 'strict',
          path: '/',
        }),
      );

      return { message: 'Token invalidated' };
    }),
});
