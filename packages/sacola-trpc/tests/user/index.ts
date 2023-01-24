require('dotenv').config();

import { describe, it, expect } from 'vitest';
import { sign } from 'jsonwebtoken';
import { appRouter } from '../../index';

const caller = appRouter.createCaller({
  req: { headers: {} } as any,
  res: {} as any,
});

const token = sign(
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

  it('should get toninho infos', async () => {
    const res = await authCaller.user.getUserInfo();

    expect(res).toStrictEqual({ name: process.env.TONINHO_USERNAME, email: process.env.TONINHO_EMAIL });
  });
});
