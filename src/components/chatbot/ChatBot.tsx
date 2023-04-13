'use client';

import { FC } from 'react';
import Image from 'next/image';
import ChatInterface from './ChatInterface';
import { useChatBot } from './helpers';

const ChatBot: FC = () => {
  const { isOpen, setIsOpen, closeChat, completeWelcome, goToChat } =
    useChatBot();

  return (
    <div className='fixed bottom-10 right-10 z-10'>
      <button
        className='p-4 dark:bg-slate-950 rounded'
        type='button'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image src='/chat.svg' alt='chatbot' width={40} height={40} />
      </button>
      <div className={!isOpen ? 'hidden' : 'block'}>
        <ChatInterface
          closeChat={closeChat}
          completeWelcome={completeWelcome}
          goToChat={goToChat}
        />
      </div>
    </div>
  );
};

export default ChatBot;
