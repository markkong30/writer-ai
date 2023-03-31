'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

type Props = {
	children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	);
};

export default Providers;
