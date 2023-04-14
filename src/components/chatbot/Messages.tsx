import { FC } from 'react';
import { Message } from './types';
import { cn } from '@lib/utils';
import Paragraph from '@components/paragraph/Paragraph';
import Scrollable from '@components/scrollable-container/Scrollable';
import { Typewriter } from 'react-simple-typewriter';
import { BeatLoader } from 'react-spinners';

type Props = {
  messages: Message[];
  updateBotMessage: () => void;
  isGeneratingOutput: boolean;
};

const Messages: FC<Props> = ({
  messages,
  updateBotMessage,
  isGeneratingOutput,
}) => {
  return (
    <Scrollable classNames='flex-1 py-4' offset>
      <div className='flex flex-col gap-4'>
        {messages?.map((message, i) => (
          <div
            key={`message-${i}`}
            className={cn(
              'max-w-[75%] p-3 text-white rounded-t-lg flex justify-center items-center',
              message.fromUser
                ? 'rounded-bl-lg self-end bg-sky-600'
                : 'rounded-br-lg self-start bg-gray-600',
            )}
          >
            <Paragraph
              size='xs'
              className='font-semibold mb-0 text-white text-start'
            >
              {i === messages.length - 1 &&
              !message.fromUser &&
              !message.typed ? (
                <Typewriter
                  words={[message.text]}
                  loop={1}
                  typeSpeed={20}
                  deleteSpeed={0}
                  onLoopDone={updateBotMessage}
                />
              ) : (
                message.text
              )}
            </Paragraph>
          </div>
        ))}
        {isGeneratingOutput && (
          <div className='max-w-[75%] p-3 text-white rounded-t-lg flex justify-center items-center rounded-br-lg self-start bg-gray-600'>
            <BeatLoader
              color='#008fd7'
              size={10}
              margin={4}
              speedMultiplier={0.6}
            />
          </div>
        )}
      </div>
    </Scrollable>
  );
};

export default Messages;
