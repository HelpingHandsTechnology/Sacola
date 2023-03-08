import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.pathname;

  // TODO: Refactor this to a better way
  if (url === '/' || url === '/profile') {
    if (!token) {
      return NextResponse.redirect(req.nextUrl.origin + '/login');
    }
  }

  if (url === '/login') {
    if (token) {
      return NextResponse.redirect(req.nextUrl.origin + '/');
    }
  }

  return NextResponse.next();
}
