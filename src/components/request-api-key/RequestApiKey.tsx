'use client';

import { Button } from '@components/button/Button';
import CopyButton from '@components/copyBtn/CopyBtn';
import Heading from '@components/heading/Heading';
import { Input } from '@components/input/Input';
import Paragraph from '@components/paragraph/Paragraph';
import { toast } from '@components/toast/Toast';
import { createApiKey } from '@lib/api';
import { useMutation } from '@tanstack/react-query';
import { Key } from 'lucide-react';

const RequestApiKey = () => {
	const {
		mutate,
		data: apiKey,
		isLoading
	} = useMutation({
		mutationFn: createApiKey,
		onError: () => {
			toast({
				title: 'Error',
				message: 'Something went wrong',
				type: 'error'
			});
		}
	});

	return (
		<div className="container md:max-w-2xl">
			<div className="flex flex-col gap-6 items-center">
				<Key className="mx-auto h-12 w-12 text-gray-400" />
				<Heading className="text-center">Request your API key</Heading>
				<Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					mutate();
				}}
				className="mt-6 sm:flex sm:items-center"
				action="#"
			>
				<label htmlFor="emails" className="sr-only">
					Your API key
				</label>
				<div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
					{apiKey && (
						<CopyButton
							className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
							valueToCopy={apiKey}
						/>
					)}
					<Input
						readOnly
						value={apiKey || ''}
						placeholder="Request an API key to display it here"
					/>
				</div>
				<div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
					<Button disabled={!!apiKey} isLoading={isLoading}>
						Request key
					</Button>
				</div>
			</form>
		</div>
	);
};

export default RequestApiKey;
