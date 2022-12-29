import { TRPCError } from '@trpc/server';

export const catchTrpcError = <T>(e: T): TRPCError => {
  if (e instanceof TRPCError) {
    return new TRPCError({
      code: e.code,
      message: e.message,
    });
  }

  return new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Ishi: ' + JSON.stringify(e),
  });
};
