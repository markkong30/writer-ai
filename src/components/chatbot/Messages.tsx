import { FC } from 'react';
import { Message } from './types';
import { cn } from '@lib/utils';
import Paragraph from '@components/paragraph/Paragraph';
import Scrollable from '@components/scrollable-container/Scrollable';

type Props = {
  messages: Message[];
  isGeneratingOutput: boolean;
};

const Messages: FC<Props> = ({ messages, isGeneratingOutput }) => {
  return (
    <Scrollable offset>
      <div className='flex-1 py-4'>
        <div className='flex flex-col gap-4'>
          {messages?.map((message, i) => (
            <div
              key={`message-${i}`}
              className={cn(
                'max-w-[80%] p-3 text-white rounded-t-lg flex justify-center items-center',
                message.fromUser
                  ? 'rounded-bl-lg self-end bg-sky-600'
                  : 'rounded-br-lg self-start bg-gray-600',
              )}
            >
              <Paragraph
                size='xs'
                className='font-semibold mb-0 text-white text-start'
              >
                {message.text}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </Scrollable>
  );
};

export default Messages;
