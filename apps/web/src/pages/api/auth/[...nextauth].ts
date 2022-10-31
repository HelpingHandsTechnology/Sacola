import NextAuth from 'next-auth';
import { authOptions } from '@sacola/trpc';

export default NextAuth(authOptions);
