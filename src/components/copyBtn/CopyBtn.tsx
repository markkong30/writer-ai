'use client';

import { Button } from '@components/button/Button';
import { toast } from '@components/toast/Toast';
import { Copy } from 'lucide-react';
import { ButtonHTMLAttributes, FC } from 'react';

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      type='button'
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: 'Copied',
          message: 'API key copied to clipboard',
          type: 'success',
        });
      }}
      variant='ghost'
      className={className}
    >
      <Copy className='h-5 w-5' />
    </Button>
  );
};

export default CopyButton;
