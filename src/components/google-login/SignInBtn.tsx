'use client';

import { Button } from '@components/button/Button';
import { toast } from '@components/toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import Image from 'next/image';

type Props = {
  text: string;
};

const SignInBtn: FC<Props> = ({ text }) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => signIn('google'),
    onError: () => {
      toast({
        title: 'Error signing in',
        message: 'Please try again later',
        type: 'error',
      });
    },
  });

  return (
    <Button onClick={() => mutate()} isLoading={isLoading}>
      <div className='flex gap-2'>
        <Image src='/google.svg' alt='' width={15} height={15} />
        <p>{text}</p>
      </div>
    </Button>
  );
};

export default SignInBtn;
