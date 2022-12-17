import { z, ZodLazy, ZodType } from 'zod';
import { Article, Tags, ArticleUser, User } from 'prisma/prisma-client';

export const userSchema: ZodType<User> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  lastCode: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const articleSchema: ZodLazy<ZodType<Article>> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    urlDomain: z.string(),
    tags: z.array(tagSchema).optional(),
  }),
);

export const tagSchema: ZodType<Tags> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  article: articleSchema.optional(),
  articleId: z.string().uuid(),
});

export const articleUserSchema: ZodType<ArticleUser> = z.object({
  userId: z.string().uuid(),
  articleId: z.string().uuid(),
  article: articleSchema.optional(),
  user: userSchema.optional(),
  isFavorite: z.boolean(),
  createdAt: z.date(),
});
