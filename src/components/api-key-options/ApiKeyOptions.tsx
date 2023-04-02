'use client';

import { FC } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@components/dropdown-menu/DropdownMenu';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@components/button/Button';
import { toast } from '@components/toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { createApiKey, revokeApiKey } from '@lib/api';

type Props = {
	apiKey: string;
};

const ApiKeyOptions: FC<Props> = ({ apiKey }) => {
	const router = useRouter();

	const { mutate: createNewKey, isLoading: isCreatingKey } = useMutation({
		mutationFn: createApiKey,
		onError: () => {
			toast({
				title: 'Error creating new API key',
				message: 'Please try again later.',
				type: 'error'
			});
		},
		onSuccess: () => router.refresh()
	});

	const { mutate: revokeKey, isLoading: isRevokingKey } = useMutation({
		mutationFn: revokeApiKey,
		onError: () => {
			toast({
				title: 'Error revoking your API key',
				message: 'Please try again later.',
				type: 'error'
			});
		},
		onSuccess: (_, isCreate) => {
			if (isCreate) {
				return createNewKey();
			}

			return router.refresh();
		}
	});

	const isLoading = isCreatingKey || isRevokingKey;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger disabled={isLoading} asChild>
				<Button variant="ghost" className="flex gap-2 items-center">
					<p>
						{isCreatingKey
							? 'Creating new key'
							: isRevokingKey
							? 'Revoking key'
							: 'Options'}
					</p>
					{isLoading && <Loader2 className="animate-spin h-4 w-4" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => {
						navigator.clipboard.writeText(apiKey);

						toast({
							title: 'Copied',
							message: 'API key copied to clipboard',
							type: 'success'
						});
					}}
				>
					Copy
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => revokeKey(true)}>
					Create new key
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => revokeKey(false)}>
					Revoke key
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ApiKeyOptions;
