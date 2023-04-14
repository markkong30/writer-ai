import Header from './Header';
import Messages from './Messages';
import Input from './ChatInput';
import { FC } from 'react';
import { Message } from './types';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  messages: Message[];
  updateBotMessage: () => void;
  generateOutput: () => void;
  isGeneratingOutput: boolean;
};

const Chat: FC<Props> = ({
  query,
  setQuery,
  messages,
  updateBotMessage,
  generateOutput,
  isGeneratingOutput,
}) => {
  return (
    <div className='w-[300px] h-[500px] p-4 rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-white flex flex-col'>
      <Header />
      <Messages
        messages={messages}
        updateBotMessage={updateBotMessage}
        isGeneratingOutput={isGeneratingOutput}
      />
      <Input
        generateOutput={generateOutput}
        isGeneratingOutput={isGeneratingOutput}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default Chat;
