import { useState } from 'react';
import { GenerateOutputParams } from '@/types/api';
import { generateOutput } from '@lib/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from '@components/toast/Toast';

export const useGenerate = (apiKey: string) => {
	const [params, setParams] = useState<GenerateOutputParams>({
		input: '',
		mode: 'extend'
	});
	const [output, setOutput] = useState('');

	const { mutate, isLoading } = useMutation({
		mutationFn: () => generateOutput(params, apiKey),
		onSuccess: (data) => setOutput(data.output),
		onError: (err) => {
			toast({
				title: 'Error generating output',
				message:
					err instanceof z.ZodError
						? err.message
						: `Limit exceeded! You can only make 10 requests per hour in a free account.`,
				type: 'error'
			});
		}
	});

	return {
		params,
		setParams,
		output,
		setOutput,
		generateOutput: mutate,
		isGenerating: isLoading
	};
};
