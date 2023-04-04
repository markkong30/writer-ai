import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	async function middleware(req) {
		const pathname = req.nextUrl.pathname;

		const user = req.nextauth.token;

		if (pathname === '/dashboard') {
			if (!user) {
				return NextResponse.redirect(new URL('/login', req.url));
			}
		}

		if (pathname === '/login') {
			if (user) {
				return NextResponse.redirect(new URL('/dashboard', req.url));
			}
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: () => true
		}
	}
);

export const config = { matcher: ['/dashboard', '/login'] };
