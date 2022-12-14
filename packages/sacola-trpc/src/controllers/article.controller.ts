import { z } from 'zod';
import { Readability } from '@mozilla/readability';
import axios from 'axios';
import { JSDOM } from 'jsdom';

import { trpc } from '../trpc';
import { articleSchema, articleUserSchema } from '../schemas';
import { prisma } from '../prisma';
import { authMiddleware } from '../middlewares/auth.middleware';
import { generateTitlePartialSearch } from '../utils/search';

const articleProcedure = trpc.procedure.use(authMiddleware);

export const articleRouter = trpc.router({
  getAll: articleProcedure.output(z.array(articleUserSchema)).query(async ({ ctx }) => {  
    return await prisma.articleUser.findMany({
      where: {
        userId: ctx.user.id
      },
      include: { article: { include: { tags: true } } }
    });
  }),
  getFavorite: articleProcedure.output(z.array(articleUserSchema)).query(async ({ ctx }) => {
    return await prisma.articleUser.findMany({
      where: {
        userId: ctx.user.id,
        isFavorite: true
      },
      include: { article: { include: { tags: true } } }
    });
  }),
  getById: articleProcedure.input(z.object({ id: z.string() })).output(articleSchema).query(async ({ ctx, input }) => {
    return await prisma.article.findUnique({
      include: { tags: true },
      where: {
        id: input.id
      }
    });
  }),
  // TODO: Zod output schema
  getReadabilityById: articleProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const response = await prisma.article.findUnique({
      where: {
        id: input.id
      }
    });

    const url = await axios.get(response?.urlDomain ?? '');

    const doc = new JSDOM(url.data);
    const readability = new Readability(doc.window.document);
    const article = readability.parse();

    return article;
  }),
  searchArticle: articleProcedure.input(z.object({ search: z.string(), isDeepSearch: z.boolean() })).output(z.array(articleUserSchema)).query(async ({ ctx, input }) => {
    const search = input.search;
    
    if (input.isDeepSearch) {
      return await prisma.articleUser.findMany({
        where: {
          userId: ctx.user.id,
          article: {
            OR: [
              {
                title: {
                  startsWith: search,
                },
              },
              {
                title: {
                  contains: search,
                },
              },
              {
                AND: generateTitlePartialSearch(search),
              },
            ],
          }
        },
        include: { article: { include: { tags: true } } }
      })
    } else {
      const startWithQuery = await prisma.articleUser.findMany({
        where: {
          userId: ctx.user.id,
          article: {
            title: {
              startsWith: search
            }
          }
        },
        include: { article: { include: { tags: true } } }
      });

      if (startWithQuery.length > 0) return startWithQuery;

      const containsQuery = await prisma.articleUser.findMany({
        where: {
          userId: ctx.user.id,
          article: {
            title: {
              contains: search
            }
          }
        },
        include: { article: { include: { tags: true } } }
      });

      if (containsQuery.length > 0) return containsQuery;

      return await prisma.articleUser.findMany({
        where: {
          userId: ctx.user.id,
          article: {
            AND: generateTitlePartialSearch(search),
          }
        },
        include: { article: { include: { tags: true } } }
      });
    }
  }),
  create: articleProcedure.input(z.object({ url: z.string() })).output(z.object({ message: z.string(), articleId: z.string().uuid() })).query(async ({ ctx, input }) => {
    const url = input.url;

    const article = await prisma.article.findUnique({
      where: {
        urlDomain: url
      }
    });

    if (article) {
      await prisma.articleUser.create({
        data: {
          articleId: article.id,
          userId: ctx.user.id
        }
      });

      return {
        message: "Article created with success!",
        articleId: article.id
      };
    } else {
      const response = await axios.get(url);
      const doc = new JSDOM(response.data);
      const reader = new Readability(doc.window.document);
      const article = reader.parse();

      const newArticle = await prisma.article.create({
        data: {
          title: article?.title || doc.window.document.title,
          urlDomain: url,
          articleUser: {
            create: [{
              userId: ctx.user.id
            }]
          }
        }
      });

      return {
        message: "Article created with success!",
        articleId: newArticle.id
      }
    }
  }),
  deleteById: articleProcedure.input(z.object({
    id: z.string().uuid(),
  })).output(z.object({ message: z.string() })).query(async ({ ctx, input }) => {
    await prisma.articleUser.delete({
      where: {
        userId_articleId: {
          userId: ctx.user.id,
          articleId: input.id
        }
      }
    });

    return { message: "Article deleted with success!" };
  }),
  // TODO: Test case that isFavorite is undefined
  updateById: articleProcedure.input(z.object({
    id: z.string().uuid(),
    isFavorite: z.boolean().optional(),
  })).output(articleUserSchema).query(async ({ ctx, input }) => {
    return await prisma.articleUser.update({
      data: {
        isFavorite: input.isFavorite
      },
      where: {
        userId_articleId: {
          articleId: input.id,
          userId: ctx.user.id
        }
      },
      include: { article: { include: { tags: true } } }
    });
  })
});
