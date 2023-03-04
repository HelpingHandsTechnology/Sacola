import { TRPCError } from '@trpc/server';
import { prisma } from '../prisma';
import { z } from 'zod';

import { authMiddleware } from '../middlewares/auth.middleware';
import { trpc } from '../trpc';
import { catchTrpcError } from '../utils/catchTrpcError';
import { tagSchema } from '../schemas';

const tagProcedure = trpc.procedure.use(authMiddleware);

export const tagRouter = trpc.router({
  create: tagProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ message: z.string(), tagId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const tag = await prisma.tag.create({ data: { name: input.name, userId: ctx.user.id } });

        return {
          message: 'Tag created with success!',
          tagId: tag.id,
        };
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
  getTags: tagProcedure.output(z.array(tagSchema)).query(async ({ ctx }) => {
    try {
      return await prisma.tag.findMany({
        where: { userId: ctx.user.id },
        select: { id: true, name: true, userId: true },
      });
    } catch (e) {
      throw catchTrpcError(e);
    }
  }),
  addTagToArticle: tagProcedure
    .input(z.object({ tagId: z.string(), articleId: z.string() }))
    .output(z.object({ message: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const articleUser = await prisma.articleUser.findUnique({
          where: {
            userId_articleId: {
              userId: ctx.user.id,
              articleId: input.articleId,
            },
          },
        });

        const tag = await prisma.tag.findUnique({ where: { id: input.tagId } });

        const articleTag = await prisma.articleTag.findUnique({
          where: {
            userId_articleId_tagId: {
              userId: ctx.user.id,
              articleId: input.articleId,
              tagId: input.tagId,
            },
          },
        });

        if (!tag) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Tag does not exist',
          });
        }

        if (!articleUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Article does not exist',
          });
        }

        if (articleTag) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Tag is already on Article',
          });
        }

        await prisma.articleTag.create({
          data: {
            userId: ctx.user.id,
            articleId: input.articleId,
            tagId: input.tagId,
          },
        });

        return {
          message: 'Tag added to article with success!',
        };
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
});
