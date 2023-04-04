import { FC } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@components/button/Button';
import Icons from '@components/icons/Icons';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import SignInBtn from '@components/google-login/SignInBtn';

const page: FC = () => {
	return (
		<>
			<div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg">
					<div className="flex flex-col items-center gap-6 text-center">
						<Link
							className={buttonVariants({
								variant: 'ghost',
								className: 'w-fit'
							})}
							href="/"
						>
							<Icons.ChevronLeft className="mr-2 h-4 w-4" />
							Back to home
						</Link>

						<Heading>Welcome back!</Heading>
						<Paragraph>Please sign in using your Google account.</Paragraph>
					</div>
					<SignInBtn text="Sign in with Google" />
				</div>
			</div>
		</>
	);
};

export default page;
