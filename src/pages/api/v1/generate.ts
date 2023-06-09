import { db } from '@/lib/db';
import { openai } from '@/lib/openai';
import { withMethods } from '@lib/middlewares';
import { getPrompts, modes } from '@lib/prompts';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const reqSchema = z.object({
  mode: z.enum(modes),
  input: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;

  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const start = new Date();

    const { mode, input } = reqSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      const duration = new Date().getTime() - start.getTime();

      await db.apiRequest.create({
        data: {
          duration,
          mode,
          method: req.method as string,
          path: req.url as string,
          status: 401,
          apiKeyId: apiKey,
        },
      });

      return res.status(401).json({ error: 'Unauthorized revoked key' });
    }

    const data = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: getPrompts(mode, input) }],
      temperature: 0.3,
      max_tokens: 1000,
      n: 1,
    });

    const output = data?.data.choices[0].message?.content.trim();

    const duration = new Date().getTime() - start.getTime();

    await db.apiRequest.create({
      data: {
        duration,
        mode,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.key,
      },
    });

    return res.status(200).json({ success: true, mode, input, output });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default withMethods(['POST'], handler);
