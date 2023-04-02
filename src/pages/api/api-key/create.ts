import { authOptions } from '@lib/auth';
import { db } from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import { CreateApiKeyResponse } from '@/types/api';
import { z } from 'zod';
import { withMethods } from '@lib/middlewares';

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<CreateApiKeyResponse>
) => {
	try {
		const session = await getServerSession(req, res, authOptions);
		const user = session?.user;

		if (!user)
			return res.status(401).json({
				error: 'Unauthorized to peform this action',
				apiKey: null
			});

		const existingApiKey = await db.apiKey.findFirst({
			where: {
				userId: user.id,
				enabled: true
			}
		});

		if (existingApiKey)
			return res.status(400).json({
				error: 'You already have a valid API key',
				apiKey: null
			});

		const newApiKey = await db.apiKey.create({
			data: {
				userId: user.id,
				key: nanoid()
			}
		});

		return res.status(201).json({ error: null, apiKey: newApiKey });
	} catch (err) {
		if (err instanceof z.ZodError) {
			return res.status(400).json({ error: err.issues, apiKey: null });
		}

		return res.status(500).json({
			error: 'Internal Server Error',
			apiKey: null
		});
	}
};

export default withMethods(['GET'], handler);
