import Paragraph from '@components/paragraph/Paragraph';
import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <div className='flex gap-4 pb-2 border-b-[0.5px] border-slate-100/10 shadow'>
      <Bot size={36} />
      <div className='flex flex-col justify-start items-start'>
        <Paragraph size='xs' className='font-bold'>
          AuthorAI Bot
        </Paragraph>
        <Paragraph
          size='xs'
          className='text-green-500 dark:text-green-300 text-[12px]'
        >
          Online
        </Paragraph>
      </div>
    </div>
  );
};

export default Header;
