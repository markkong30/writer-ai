import { withMethods } from '@lib/middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import generateResponse from '../../../../llm/lib/generateResponse';
import { GenerateParams } from '../../../../llm/lib/types';

const reqSchema = z.object({
  query: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;

  try {
    const { query } = reqSchema.parse(body);

    const params: GenerateParams = {
      history: [],
      query,
    };

    const response = await generateResponse(params);
    const output = response?.text;

    return res.status(200).json({ output });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ err: err.issues });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default withMethods(['POST'], handler);
