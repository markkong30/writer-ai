import { Method } from '@/types/api';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withMethods(methods: Method[], handler: NextApiHandler) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (!req.method || !methods.includes(req.method as Method)) {
			return res.status(405).end();
		}

		return handler(req, res);
	};
}
