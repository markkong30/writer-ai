import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@lib/utils';
import { FC, ReactNode } from 'react';
import Providers from './provider/Providers';
import Navbar from '@components/navbar/Navbar';
import { Toaster } from '@components/toast/Toast';
import ChatBot from '@components/chatbot/ChatBot';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <html
      lang='en'
      className={cn('bg-white text-slate-900 antialiased', inter.className)}
    >
      <body className='min-h-screen bg-slate-50 dark:bg-slate-900 antialiased'>
        <Providers>
          <Navbar />
          <Toaster position='bottom-right' />
          <ChatBot />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
