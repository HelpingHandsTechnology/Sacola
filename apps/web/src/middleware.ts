import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {},
  {
    callbacks: {
      authorized: (response) => {
        if (response.token) return true;
        return false;
      },
    },
  }
);

export const config = { matcher: ['/'] };
