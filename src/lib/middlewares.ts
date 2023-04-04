import { Method } from '@/types/api';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
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
			const now = new Date();
			const key = req.headers.authorization;

			const apiKey = await db.apiKey.findFirst({
				where: { key, enabled: true }
			});

			if (!apiKey) return handler(req, res);

			const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

			const user = await db.user.findUnique({
				where: { id: apiKey.userId }
			});

			const userRequests = await db.apiRequest.findMany({
				where: {
					apiKey: {
						userId: user?.id
					},
					timestamp: { gte: hourAgo },
					status: 200
				},
				orderBy: {
					timestamp: 'desc'
				}
			});

			if (!userRequests.length) return handler(req, res);

			const requestCount = userRequests.length;
			const latestRequest = userRequests[0];

			if (
				requestCount === MAX_REQUEST_PER_HOUR &&
				latestRequest &&
				latestRequest.timestamp.getTime() >= hourAgo.getTime()
			) {
				await db.apiRequest.create({
					data: {
						duration: new Date().getTime() - now.getTime(),
						mode: req.body.mode,
						method: req.method as string,
						path: req.url as string,
						status: 429,
						apiKeyId: key as string
					}
				});

				const minutesLeft =
					60 - differenceInMinutes(now, latestRequest.timestamp);

				return res.status(429).json({
					error: `Limit exceeded! You can only make ${MAX_REQUEST_PER_HOUR} requests per hour in a free account. Please try again in ${minutesLeft} minutes.`
				});
			}

			return handler(req, res);
		}

		return handler(req, res);
	};
}
