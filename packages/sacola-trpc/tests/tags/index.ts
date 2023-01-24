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

const authCaller = appRouter.createCaller({
  req: { headers: { authorization: token } } as any,
  res: {} as any,
});

describe('Authorization suite', () => {
  it('Should retrieve all Tonis Tags', async () => {
    const res = await authCaller.tags.getTags();

    expect(Array.isArray(res)).toBeTruthy();
  });
});
