import { ApiKey } from '@prisma/client';
import { ZodIssue } from 'zod';

export interface CreateApiKeyResponse {
	error: string | ZodIssue[] | null;
	apiKey: ApiKey | null;
}

export interface RevokeApiKeyResponse {
	error: string | ZodIssue[] | null;
	success: boolean;
}
