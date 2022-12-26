require('dotenv').config();

import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { appRouter } from '../../index';

const caller = appRouter.createCaller({
  req: { headers: {} } as any,
  res: {} as any,
});

const token = jwt.sign(
  { id: process.env.TONINHO_ID, username: process.env.TONINHO_USERNAME },
  process.env.JWT_SECRET || 'secret',
  {
    expiresIn: '7d',
  },
);

const authCaller = appRouter.createCaller({
  req: { headers: { authorization: token } } as any,
  res: {} as any,
});

describe('Authorization suite', () => {
  it('should not be authenticated', async () => {
    caller.articles.getAll().catch((err) => expect(err.code).toBe('UNAUTHORIZED'));
  });

  it('should be authenticated', async () => {
    const res = await authCaller.articles.getAll();

    expect(Array.isArray(res)).toBeTruthy();
  });
});
