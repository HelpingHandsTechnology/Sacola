// utils/trpc.ts
import { QueryClient } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from 'sacola-trpc';
import superjson from 'superjson';
import { authMMKVKeys, getAuthMMKV } from './mmkv';

export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();
export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
      headers() {
        return {
          Authorization: getAuthMMKV(authMMKVKeys.authToken) || '',
        };
      },
    }),
  ],
});
