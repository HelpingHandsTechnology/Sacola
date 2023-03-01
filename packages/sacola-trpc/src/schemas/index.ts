import { z, ZodLazy, ZodType } from 'zod';
import { Article, Tag, ArticleUser, User, ArticleTag } from 'prisma/prisma-client';

export const userSchema: ZodLazy<ZodType<User>> = z.lazy(() => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  username: z.string().nullable(),
  emailVerified: z.boolean(),
  lastCode: z.string().nullable(),
  codeLastSent: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),

  articleUser: z.array(articleUserSchema).optional(),
  tags: z.array(tagSchema).optional()
}));

export const articleSchema: ZodLazy<ZodType<Article>> = z.lazy(() => z.object({
  id: z.string(),
  title: z.string(),
  urlDomain: z.string(),
  image: z.string(),
  shortDescription: z.string().nullable(),

  articleUser: z.array(articleUserSchema).optional(),
}));

export const tagSchema: ZodLazy<ZodType<Tag>> = z.lazy(() => z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  user: userSchema.optional(),

  articleTag: z.array(articleTagSchema).optional()
}));

export const articleUserSchema: ZodLazy<ZodType<ArticleUser>> = z.lazy(() => z.object({
  userId: z.string(),
  articleId: z.string(),
  article: articleSchema.optional(),
  user: userSchema.optional(),
  isFavorite: z.boolean(),
  shortDescription: z.string().nullable(),
  createdAt: z.date(),

  articleTag: z.array(articleTagSchema).optional()
}));

export const articleTagSchema: ZodLazy<ZodType<ArticleTag>> = z.lazy(() => z.object({
  userId: z.string(),
  articleId: z.string(),
  articleUser: articleUserSchema.optional(),
  tagId: z.string(),
  tag: tagSchema.optional(),
}));
