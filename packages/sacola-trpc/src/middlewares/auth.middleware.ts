import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';

import { trpc } from '../trpc';
import { prisma } from '../prisma'

export const authMiddleware = trpc.middleware(async ({ ctx, next }) => {
    const authorization = ctx.req.headers.authorization;

    if (!authorization) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User is not authorized'
        });
    }

    jwt.verify(authorization, process.env.JWT_SECRET || 'secret', (err) => {
        if (err) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid JWT'
            });
        }
    });

    const jwtUser = jwt.decode(authorization, { json: true });

    if (!jwtUser || !jwtUser.id || !jwtUser.exp) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User is not authorized'
        });
    }

    if (new Date(jwtUser.exp * 1000) < new Date()) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Token expired'
        });
    }

    const user = await prisma.user.findUnique({ where: { id: jwtUser.id } });

    if (!user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User not found'
        });
    }

    return next({
        ctx: {
            ...ctx,
            user
        }
    });
});