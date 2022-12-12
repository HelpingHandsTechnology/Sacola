import { z } from 'zod';

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    password: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const articleSchema = z.lazy(() => z.object({
    id: z.string().uuid(),
    title: z.string(),
    urlDomain: z.string(),
    isFavorite: z.string(),
    user: userSchema.optional(),
    userId: z.string(),
    tags: z.array(tagSchema).optional()
}));

export const tagSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    article: articleSchema.optional(),
    articleId: z.string()
});