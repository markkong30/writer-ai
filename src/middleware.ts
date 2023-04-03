import { authOptions } from '@lib/auth';
import { db } from '@lib/db';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	async function middleware(req, res) {
		// console.log(req.nextauth);
		const pathname = req.nextUrl.pathname;

		if (pathname.startsWith('/api')) {
			const user = req.nextauth.token;

			if (!user) return NextResponse.json({ error: 'Unauthorized' });

			// const apiKey = await db.apiKey.findFirst({
			// 	where: { userId: user.id, enabled: true }
			// });

			// const userRequests = await db.apiRequest.findMany({
			// 	where: {
			// 		apiKeyId: apiKey?.key
			// 	},
			// 	orderBy: {
			// 		timestamp: 'desc'
			// 	},
			// 	take: 5
			// });

			// console.log(userRequests);
		}
	},
	{
		callbacks: {
			authorized: () => true
		}
	}
);
