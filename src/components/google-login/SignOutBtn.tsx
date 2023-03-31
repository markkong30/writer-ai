'use client';

import { Button } from '@components/button/Button';
import { toast } from '@components/toast/Toast';
import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';

type Props = {};

const SignOutBtn: FC<Props> = ({}) => {
	const [isLoading, setIsLoading] = useState(false);

	const signOutWithGoogle = async () => {
		try {
			await signOut();
		} catch (err) {
			toast({
				title: 'Error signing out',
				message: 'Please try again later',
				type: 'error'
			});
		}
	};

	return (
		<Button onClick={signOutWithGoogle} isLoading={isLoading}>
			Sign out
		</Button>
	);
};

export default SignOutBtn;
