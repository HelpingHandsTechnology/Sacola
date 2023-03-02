require('dotenv').config();

import { describe, it, expect } from 'vitest';
import { sign } from 'jsonwebtoken';
import { appRouter } from '../../index';

const token = sign(
  { id: process.env.TONINHO_ID, username: process.env.TONINHO_USERNAME },
  process.env.JWT_SECRET || 'secret',
  {
    expiresIn: '7d',
  },
);

const token2 = sign(
  { id: process.env.ALTERNATIVE_TONINHO_ID, username: process.env.TONINHO_USERNAME },
  process.env.JWT_SECRET || 'secret',
  {
    expiresIn: '7d',
  },
);

const authCaller = appRouter.createCaller({
  req: { headers: { authorization: token } } as any,
  res: {} as any,
});

const authCaller2 = appRouter.createCaller({
  req: { headers: { authorization: token2 } } as any,
  res: {} as any,
});

describe('Articles suite', () => {
  it('create test', async () => {
    const res = await authCaller.articles.create({ url: 'https://trpc.io' });
    const res2 = await authCaller2.articles.create({ url: 'https://trpc.io' });

    expect(res.articleId).toBe(res2.articleId);
  });

  it('should get only favorites articles', async () => {
    const res = await authCaller.articles.getAll({ isFavorite: true });

    expect(res.every(article => article.isFavorite)).toBeTruthy();
  });

  it('should get only the articles that has the TAG_TESTE tag', async () => {
    const res = await authCaller.articles.getAll({ tags: ["TAG_TESTE"] });

    expect(res.every(article => article.articleTags.every(tag => tag.tag.name === "TAG_TESTE"))).toBeTruthy();
  });
});
