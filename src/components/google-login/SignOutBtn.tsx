'use client';

import { Button } from '@components/button/Button';
import { toast } from '@components/toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { FC } from 'react';

type Props = {};

const SignOutBtn: FC<Props> = ({}) => {
	const { mutate, isLoading } = useMutation({
		mutationFn: () => signOut(),
		onError: () => {
			toast({
				title: 'Error signing out',
				message: 'Please try again later',
				type: 'error'
			});
		}
	});

	return (
		<Button onClick={() => mutate()} isLoading={isLoading}>
			Sign out
		</Button>
	);
};

export default SignOutBtn;
