import { Method } from '@/types/api';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { db } from './db';
import { differenceInMinutes } from 'date-fns';

const MAX_REQUEST_PER_HOUR = 5;

export function withMethods(methods: Method[], handler: NextApiHandler) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (!req.method || !methods.includes(req.method as Method)) {
			return res.status(405).end();
		}

		const pathname = req.url as string;

		if (pathname.startsWith('/api/v1')) {
			const session = await getServerSession(req, res, authOptions);

			if (!session?.user) return;

			const apiKey = await db.apiKey.findFirst({
				where: { userId: session.user.id, enabled: true }
			});

			const userRequests = await db.apiRequest.findMany({
				where: {
					apiKeyId: apiKey?.key
				},
				orderBy: {
					timestamp: 'desc'
				},
				take: MAX_REQUEST_PER_HOUR
			});

			if (!userRequests.length) return handler(req, res);

			const oldestRequest = userRequests[userRequests.length - 1];

			if (differenceInMinutes(new Date(), oldestRequest.timestamp) < 60) {
				res.status(400).json({
					error:
						'Limit exceeded! You can only make 5 requests per hour in a free account'
				});
				return res.end();
			}

			return handler(req, res);
		}
		return handler(req, res);
	};
}
