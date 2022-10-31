import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn() {
      return true;
    },
    redirect({ baseUrl }) {
      return baseUrl;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: 'none',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 4,
  },
};
