import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { withMethods } from '@lib/middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { RevokeApiKeyResponse } from '@/types/api';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<RevokeApiKeyResponse>
) => {
	try {
		const session = await getServerSession(req, res, authOptions);
		const user = session?.user;

		if (!user) {
			return res.status(401).json({ error: 'Unauthorized', success: false });
		}

		const existingApiKey = await db.apiKey.findFirst({
			where: { userId: user.id, enabled: true }
		});

		if (!existingApiKey) {
			return res
				.status(500)
				.json({ error: 'This API key could not be revoked.', success: false });
		}

		// invalidate API key
		await db.apiKey.update({
			where: { id: existingApiKey.id },
			data: {
				enabled: false
			}
		});

		return res.status(200).json({ error: null, success: true });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, success: false });
		}

		return res
			.status(500)
			.json({ error: 'Internal Server Error', success: false });
	}
};

export default withMethods(['POST'], handler);
