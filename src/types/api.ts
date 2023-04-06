import { Mode } from '@lib/prompts';
import { ApiKey } from '@prisma/client';
import { ZodIssue } from 'zod';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface CreateApiKeyResponse {
	error: string | ZodIssue[] | null;
	apiKey: ApiKey | null;
}

export interface RevokeApiKeyResponse {
	error: string | ZodIssue[] | null;
	success: boolean;
}

export interface GenerateOutputParams {
	mode: Mode;
	input: string;
}

export interface GenerateOutputResponse {
	mode: Mode;
	output: string;
	success: boolean;
	error?: string | ZodIssue[];
}
