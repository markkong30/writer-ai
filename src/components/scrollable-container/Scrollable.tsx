import { cn } from '@lib/utils';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  offset?: boolean;
};

const Scrollable: FC<Props> = ({ children, offset }) => {
  return (
    <div className={cn('overflow-y-scroll', offset && '-mr-4 pr-2')}>
      {children}
    </div>
  );
};

export default Scrollable;
