'use client';

import { Button } from '@components/button/Button';
import { toast } from '@components/toast/Toast';
import { signIn } from 'next-auth/react';
import { FC, useState } from 'react';

type Props = {};

const SignInBtn: FC<Props> = ({}) => {
	const [isLoading, setIsLoading] = useState(false);

	const signInWithGoogle = async () => {
		try {
			await signIn('google');
		} catch (err) {
			toast({
				title: 'Error signing in',
				message: 'Please try again later',
				type: 'error'
			});
		}
	};

	return (
		<Button onClick={signInWithGoogle} isLoading={isLoading}>
			Sign in
		</Button>
	);
};

export default SignInBtn;
