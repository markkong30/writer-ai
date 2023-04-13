import { cn } from '@lib/utils';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  offset?: boolean;
  classNames?: string;
};

const Scrollable: FC<Props> = ({ children, offset, classNames }) => {
  return (
    <div
      className={cn('overflow-y-scroll', offset && '-mr-4 pr-2', classNames)}
    >
      {children}
    </div>
  );
};

export default Scrollable;
