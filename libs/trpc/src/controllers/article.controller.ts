import { createRouter } from '../context';
import { z } from 'zod';
import { Readability } from '@mozilla/readability';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { TRPCError } from '@trpc/server';

export const articleRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.article.findMany({
        include: { tags: true },
        where: { userId: ctx.session?.user?.id },
      });
    },
  })
  .query('getFavorite', {
    async resolve({ ctx }) {
      return await ctx.prisma.article.findMany({
        where: {
          isFavorite: true,
          userId: ctx.session?.user?.id,
        },
        include: { tags: true },
      });
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.article.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getReadabilityById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const response = await ctx.prisma.article.findUnique({
        where: {
          id: input.id,
        },
      });

      const url = await axios.get(response?.urlDomain ?? '');

      const doc = new JSDOM(url.data);
      const readabability = new Readability(doc.window.document);
      const article = readabability.parse();

      return article;
    },
  })
  .query('getFilteredByName', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.article.findMany({
        where: {
          title: {
            contains: input.name,
          },
        },
      });
    },
  })
  .mutation('create', {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
      const response = await axios.get(input.url);
      const doc = new JSDOM(response.data);
      const reader = new Readability(doc.window.document);
      const article = reader.parse();

      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Missing userId',
        });
      }

      return await ctx.prisma.article.create({
        data: {
          title: article?.title || doc.window.document.title,
          urlDomain: input.url,
          isFavorite: false,
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation('deleteById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const deleted = await ctx.prisma.article.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    },
  })
  .mutation('updateById', {
    input: z.object({
      id: z.string(),
      isFavorite: z.boolean().optional(),
      title: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const updated = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          isFavorite: input.isFavorite,
          title: input.title,
        },
      });
      return updated;
    },
  });
