import { CreateApiKeyResponse } from '@/types/api';

export const createApiKey = async () => {
	const res = await fetch('/api/api-key/create');
	const data = (await res.json()) as CreateApiKeyResponse;

	return data.apiKey?.key;
};

export const revokeApiKey = async (isCreate?: boolean) => {
	const res = await fetch('/api/api-key/revoke', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const data = await res.json();

	if (data.error) {
		throw new Error(data.error);
	}

	return data;
};
