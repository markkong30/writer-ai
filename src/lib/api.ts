import {
  CreateApiKeyResponse,
  GenerateBotParams,
  GenerateBotResponse,
  GenerateOutputParams,
  GenerateOutputResponse,
} from '@/types/api';
import { z } from 'zod';

export const createApiKey = async () => {
  const res = await fetch('/api/api-key/create');
  const data = (await res.json()) as CreateApiKeyResponse;

  return data.apiKey?.key;
};

export const revokeApiKey = async () => {
  const res = await fetch('/api/api-key/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export const generateOutput = async (
  params: GenerateOutputParams,
  key: string,
) => {
  const res = await fetch('/api/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: key,
    },
    body: JSON.stringify(params),
  });

  const data = (await res.json()) as GenerateOutputResponse;

  if (data.error) {
    throw new Error(
      data.error instanceof z.ZodError
        ? data.error.issues[0].message
        : (data.error as string),
    );
  }

  return data;
};

export const generateBot = async (params: GenerateBotParams) => {
  const res = await fetch('/api/bot/prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = (await res.json()) as GenerateBotResponse;

  return data;
};
