import { z } from 'zod';
import { Readability } from '@mozilla/readability';
import axios from 'axios';
import { JSDOM } from 'jsdom';

import { trpc } from '../trpc';
import { prisma } from '../prisma';
import { authMiddleware } from '../middlewares/auth.middleware';
import { generateTitlePartialSearch } from '../utils/search';
import { Prisma } from '@prisma/client';

const articleProcedure = trpc.procedure.use(authMiddleware);

const formattedArticleUserSchema = z.object({
  articleId: z.string(),
  article: z.object({
    id: z.string(),
    title: z.string(),
    urlDomain: z.string(),
  }),
  userId: z.string(),
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  isFavorite: z.boolean(),
  articleTags: z.array(
    z.object({
      tagId: z.string(),
      tag: z.object({
        id: z.string(),
        name: z.string(),
      }),
    }),
  ),
});

export const articleRouter = trpc.router({
  getAll: articleProcedure
    .input(
      z
        .object({
          isFavorite: z.boolean().optional(),
          tags: z.array(z.string()).optional(),
        })
        .optional(),
    )
    .output(z.array(formattedArticleUserSchema))
    .query(async ({ ctx, input }) => {
      const tagsFilter = input?.tags
        ? {
            articleTags: {
              some: {
                OR: input.tags.map((item): Prisma.ArticleTagWhereInput => {
                  return {
                    tag: {
                      name: {
                        equals: item,
                      },
                    },
                  };
                }),
              },
            },
          }
        : {};

      return await prisma.articleUser.findMany({
        where: {
          userId: ctx.user.id,
          isFavorite: input?.isFavorite,
          ...tagsFilter,
        },
        select: {
          articleId: true,
          article: {
            select: {
              id: true,
              title: true,
              urlDomain: true,
            },
          },
          userId: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          isFavorite: true,
          articleTags: {
            select: {
              tagId: true,
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  getById: articleProcedure
    .input(z.object({ id: z.string() }))
    .output(
      z
        .object({
          id: z.string(),
          title: z.string(),
          urlDomain: z.string(),
        })
        .nullable(),
    )
    .query(async ({ ctx, input }) => {
      return await prisma.article.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          title: true,
          urlDomain: true,
        },
      });
    }),
  // TODO: Zod output schema
  getReadabilityById: articleProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const response = await prisma.article.findUnique({
      where: {
        id: input.id,
      },
    });

    const url = await axios.get(response?.urlDomain ?? '');

    const doc = new JSDOM(url.data);
    const readability = new Readability(doc.window.document);
    const article = readability.parse();

    return article;
  }),
  searchArticle: articleProcedure
    .input(z.object({ search: z.string(), isDeepSearch: z.boolean() }))
    .output(z.array(formattedArticleUserSchema))
    .query(async ({ ctx, input }) => {
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
            },
          },
          select: {
            articleId: true,
            article: {
              select: {
                id: true,
                title: true,
                urlDomain: true,
              },
            },
            userId: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            isFavorite: true,
            articleTags: {
              select: {
                tagId: true,
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
      } else {
        const startWithQuery = await prisma.articleUser.findMany({
          where: {
            userId: ctx.user.id,
            article: {
              title: {
                startsWith: search,
              },
            },
          },
          select: {
            articleId: true,
            article: {
              select: {
                id: true,
                title: true,
                urlDomain: true,
              },
            },
            userId: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            isFavorite: true,
            articleTags: {
              select: {
                tagId: true,
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });

        if (startWithQuery.length > 0) return startWithQuery;

        const containsQuery = await prisma.articleUser.findMany({
          where: {
            userId: ctx.user.id,
            article: {
              title: {
                contains: search,
              },
            },
          },
          select: {
            articleId: true,
            article: {
              select: {
                id: true,
                title: true,
                urlDomain: true,
              },
            },
            userId: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            isFavorite: true,
            articleTags: {
              select: {
                tagId: true,
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });

        if (containsQuery.length > 0) return containsQuery;

        return await prisma.articleUser.findMany({
          where: {
            userId: ctx.user.id,
            article: {
              AND: generateTitlePartialSearch(search),
            },
          },
          select: {
            articleId: true,
            article: {
              select: {
                id: true,
                title: true,
                urlDomain: true,
              },
            },
            userId: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            isFavorite: true,
            articleTags: {
              select: {
                tagId: true,
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
      }
    }),
  create: articleProcedure
    .input(z.object({ url: z.string() }))
    .output(z.object({ message: z.string(), articleId: z.string() }))
    .query(async ({ ctx, input }) => {
      const url = input.url;

      const article = await prisma.article.findUnique({
        where: {
          urlDomain: url,
        },
      });

      if (article) {
        const userAlreadySavedArticle = await prisma.articleUser.findUnique({
          where: {
            userId_articleId: {
              userId: ctx.user.id,
              articleId: article.id,
            },
          },
        });

        if (userAlreadySavedArticle) {
          return {
            message: 'Article already have saved this article',
            articleId: article.id,
          };
        }

        await prisma.articleUser.create({
          data: {
            articleId: article.id,
            userId: ctx.user.id,
          },
        });

        return {
          message: 'Article saved with success!',
          articleId: article.id,
        };
      }

      const { data } = await axios.get(url);

      const doc = new JSDOM(data);
      const readability = new Readability(doc.window.document);
      const reader = readability.parse();

      const newArticle = await prisma.article.create({
        data: {
          title: reader?.title || doc.window.document.title,
          urlDomain: url,
          articleUser: {
            create: [
              {
                userId: ctx.user.id,
              },
            ],
          },
        },
      });

      return {
        message: 'Article saved with success!',
        articleId: newArticle.id,
      };
    }),
  deleteById: articleProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .output(z.object({ message: z.string() }))
    .query(async ({ ctx, input }) => {
      await prisma.articleUser.delete({
        where: {
          userId_articleId: {
            userId: ctx.user.id,
            articleId: input.id,
          },
        },
      });

      return { message: 'Article deleted with success!' };
    }),
  // TODO: Test case that isFavorite is undefined
  updateById: articleProcedure
    .input(
      z.object({
        id: z.string(),
        isFavorite: z.boolean().optional(),
      }),
    )
    .output(formattedArticleUserSchema)
    .query(async ({ ctx, input }) => {
      return await prisma.articleUser.update({
        data: {
          isFavorite: input.isFavorite,
        },
        where: {
          userId_articleId: {
            articleId: input.id,
            userId: ctx.user.id,
          },
        },
        select: {
          articleId: true,
          article: {
            select: {
              id: true,
              title: true,
              urlDomain: true,
            },
          },
          userId: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          isFavorite: true,
          articleTags: {
            select: {
              tagId: true,
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
});
