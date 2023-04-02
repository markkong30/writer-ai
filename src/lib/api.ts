import { CreateApiKeyResponse } from '@/types/api';

export const createApiKey = async () => {
	const res = await fetch('/api/api-key/create');
	const data = (await res.json()) as CreateApiKeyResponse;

	return data.apiKey?.key;
};
