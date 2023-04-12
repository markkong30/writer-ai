'use client';

import Header from './Header';
import Messages from './Messages';
import Input from './ChatInput';
import { useChat } from './helpers';

const Chat = () => {
  const { query, setQuery, messages, generateOutput, isGeneratingOutput } =
    useChat();

  return (
    <div className='w-[300px] h-[500px] p-4 rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-white flex flex-col'>
      <Header />
      <Messages messages={messages} isGeneratingOutput={isGeneratingOutput} />
      <Input
        generateOutput={generateOutput}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default Chat;
