'use client';

import { FC } from 'react';
import Image from 'next/image';
import ChatInterface from './ChatInterface';
import { useChat, useChatBot } from './helpers';

const ChatBot: FC = () => {
  const { isOpen, setIsOpen, closeChat, completeWelcome, goToChat } =
    useChatBot();
  const chatProps = useChat();

  return (
    <div className='fixed bottom-10 right-10 z-10'>
      <button
        className='p-4 dark:bg-slate-950 rounded shadow-lg'
        type='button'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image src='/chat.svg' alt='chatbot' width={40} height={40} />
      </button>
      {isOpen && (
        <ChatInterface
          closeChat={closeChat}
          completeWelcome={completeWelcome}
          goToChat={goToChat}
          {...chatProps}
        />
      )}
    </div>
  );
};

export default ChatBot;
