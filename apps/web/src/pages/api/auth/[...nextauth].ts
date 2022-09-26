import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@sacola/db';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      console.log(session, user);
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: 'none',
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
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

export default NextAuth(authOptions);
