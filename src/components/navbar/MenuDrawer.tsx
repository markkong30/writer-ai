'use client';

import { FC, useState } from 'react';
import { Drawer } from '@mui/material';
import { Menu } from 'lucide-react';
import { Button, buttonVariants } from '@components/button/Button';
import { NavItem } from './Navbar';
import Link from 'next/link';
import SignOutBtn from '@components/google-login/SignOutBtn';
import SignInBtn from '@components/google-login/SignInBtn';

type Props = {
  navItems: NavItem[];
  hasUser: boolean;
};

const MenuDrawer: FC<Props> = ({ navItems, hasUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <Button variant='ghost' className='px-2' onClick={() => setIsOpen(true)}>
        <Menu />
      </Button>
      <Drawer
        className='md:hidden'
        anchor='left'
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <aside className='w-[250px] h-screen bg-slate-50 dark:bg-slate-950 px-4 pt-5 pb-10 flex flex-col justify-between'>
          <div>
            <Link href='/' className={buttonVariants({ variant: 'link' })}>
              AuthorAI
            </Link>
            <ul className='flex flex-col gap-6 mt-10'>
              {navItems.map((item, i) =>
                item.shouldRender ? (
                  <li key={`item-${i}`}>
                    <Link
                      href={item.link}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {item.section}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
          {hasUser ? <SignOutBtn /> : <SignInBtn text='Sign in' />}
        </aside>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
