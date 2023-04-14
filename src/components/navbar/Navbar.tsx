import { buttonVariants } from '@components/button/Button';
import SignInBtn from '@components/google-login/SignInBtn';
import SignOutBtn from '@components/google-login/SignOutBtn';
import { ThemeToggle } from '@components/theme-toggle/ThemeToggle';
import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import MenuDrawer from './MenuDrawer';

export type NavItem = {
  section: string;
  link: string;
  shouldRender: boolean;
};

// @ts-expect-error server-side
const Navbar: FC = async () => {
  const session = await getServerSession(authOptions);

  const navItems: NavItem[] = [
    {
      section: 'Documentation',
      link: '/documentation',
      shouldRender: true,
    },
    {
      section: 'Playground',
      link: '/playground',
      shouldRender: true,
    },
    {
      section: 'Dashboard',
      link: '/dashboard',
      shouldRender: !!session,
    },
  ];

  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <MenuDrawer navItems={navItems} hasUser={!!session} />
          <Link href='/' className={buttonVariants({ variant: 'link' })}>
            AuthorAI
          </Link>
        </div>

        <div className='md:hidden'>
          <ThemeToggle />
        </div>

        <div className='hidden md:flex gap-4'>
          <ThemeToggle />
          {navItems.map((item, i) =>
            item.shouldRender ? (
              <Link
                key={`item-${i}`}
                href={item.link}
                className={buttonVariants({ variant: 'ghost' })}
              >
                {item.section}
              </Link>
            ) : null,
          )}
          {session ? <SignOutBtn /> : <SignInBtn text='Sign in' />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
