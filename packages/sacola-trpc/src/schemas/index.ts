import { z, ZodLazy, ZodType } from 'zod';
import { Article, Tags } from 'prisma/prisma-client';

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const articleSchema: ZodLazy<ZodType<Article>> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    urlDomain: z.string(),
    isFavorite: z.string(),
    userId: z.string(),
    tags: z.array(tagSchema).optional(),
  }),
);

export const tagSchema: ZodType<Tags> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  article: articleSchema.optional(),
  articleId: z.string().uuid(),
});

export const articleUserSchema = z.object({
  userId: z.string().uuid(),
  articleId: z.string().uuid(),
  articles: z.array(articleSchema).optional(),
  users: z.array(userSchema).optional(),
});
