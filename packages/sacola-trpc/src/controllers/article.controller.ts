import { z } from 'zod';
import { Readability } from '@mozilla/readability';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Prisma } from '@prisma/client';

import { trpc } from '../trpc';
import { prisma } from '../prisma';
import { authMiddleware } from '../middlewares/auth.middleware';
import { generateTitlePartialSearch } from '../utils/search';
import { catchTrpcError } from '../utils/catchTrpcError';
import { getSiteDescription } from '../utils/readability';
import { ArticleRepository } from '../repository/article';
import { ArticleUserRepository } from '../repository/articleUser';

const articleProcedure = trpc.procedure.use(authMiddleware);

const formattedArticleUserSchema = z.object({
  shortDescription: z.string().nullable(),
  articleId: z.string(),
  article: z.object({
    id: z.string(),
    title: z.string(),
    urlDomain: z.string(),
    image: z.string(),
    shortDescription: z.string().nullable(),
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
  getAll: articleProcedure.output(z.array(formattedArticleUserSchema)).query(async ({ ctx, input }) => {
    try {
      return await prisma.articleUser.findMany({
        where: {
          userId: ctx.user.id,
        },
        select: {
          shortDescription: true,
          articleId: true,
          article: {
            select: {
              id: true,
              title: true,
              urlDomain: true,
              image: true,
              shortDescription: true,
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
    } catch (e) {
      throw catchTrpcError(e);
    }
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
      try {
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
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
  // TODO: Zod output schema
  getReadabilityById: articleProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    try {
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
    } catch (e) {
      throw catchTrpcError(e);
    }
  }),
  searchArticle: articleProcedure
    .input(
      z.object({
        search: z.string(),
        isDeepSearch: z.boolean(),
        isFavorite: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
      }),
    )
    .output(z.array(formattedArticleUserSchema))
    .query(async ({ ctx, input }) => {
      const search = input.search;

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

      try {
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
              isFavorite: input.isFavorite,
              ...tagsFilter,
            },
            select: {
              shortDescription: true,
              articleId: true,
              article: {
                select: {
                  id: true,
                  title: true,
                  urlDomain: true,
                  image: true,
                  shortDescription: true,
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
              isFavorite: input.isFavorite,
              ...tagsFilter,
            },
            select: {
              shortDescription: true,
              articleId: true,
              article: {
                select: {
                  id: true,
                  title: true,
                  urlDomain: true,
                  image: true,
                  shortDescription: true,
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
              isFavorite: input.isFavorite,
              ...tagsFilter,
            },
            select: {
              shortDescription: true,
              articleId: true,
              article: {
                select: {
                  id: true,
                  title: true,
                  urlDomain: true,
                  image: true,
                  shortDescription: true,
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
              isFavorite: input.isFavorite,
              ...tagsFilter,
            },
            select: {
              shortDescription: true,
              articleId: true,
              article: {
                select: {
                  id: true,
                  title: true,
                  urlDomain: true,
                  image: true,
                  shortDescription: true,
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
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
  create: articleProcedure
    .input(z.object({ url: z.string() }))
    .output(z.object({ message: z.string(), articleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const url = input.url;

      try {
        const article = await ArticleRepository.findArticleByUrl(url);

        if (article) {
          const userAlreadySavedArticle = await ArticleUserRepository.findArticleUserByUserIdAndArticleId({
            articleId: article.id,
            userId: ctx.user.id,
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

        const { data } = await axios.get(url, {
          headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
        });

        const doc = new JSDOM(data);
        const readability = new Readability(doc.window.document);
        const reader = readability.parse();

        const imgElement = doc.window.document.querySelector('meta[property="og:image"]');
        const img = imgElement && imgElement.getAttribute('content');

        const newArticle = await prisma.article.create({
          data: {
            title: reader?.title || doc.window.document.title,
            urlDomain: url,
            image: img || 'https://avatars.githubusercontent.com/u/106390362?s=200&v=4',
            shortDescription: getSiteDescription(reader, doc.window.document),
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
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
  deleteById: articleProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .output(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await prisma.articleUser.delete({
          where: {
            userId_articleId: {
              userId: ctx.user.id,
              articleId: input.id,
            },
          },
        });

        return { message: 'Article deleted with success!' };
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
  // TODO: Test case that isFavorite is undefined
  updateById: articleProcedure
    .input(
      z.object({
        id: z.string(),
        isFavorite: z.boolean().optional(),
        shortDescription: z.string().optional(),
      }),
    )
    .output(formattedArticleUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await prisma.articleUser.update({
          data: {
            isFavorite: input.isFavorite,
            shortDescription: input.shortDescription ? input.shortDescription : null,
          },
          where: {
            userId_articleId: {
              articleId: input.id,
              userId: ctx.user.id,
            },
          },
          select: {
            shortDescription: true,
            articleId: true,
            article: {
              select: {
                id: true,
                title: true,
                urlDomain: true,
                image: true,
                shortDescription: true,
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
      } catch (e) {
        throw catchTrpcError(e);
      }
    }),
});
