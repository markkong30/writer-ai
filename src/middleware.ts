import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const publicRoutes = ['/', '/documentation', '/playground', '/login'];

const privateRoutes = ['/dashboard'];

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const user = req.nextauth.token;

    if (user && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!user && privateRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = { matcher: [...publicRoutes, ...privateRoutes] };
