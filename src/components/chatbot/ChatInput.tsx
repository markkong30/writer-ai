import { Input } from '@components/input/Input';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  generateOutput: () => void;
  isGeneratingOutput: boolean;
};

const ChatInput: FC<Props> = ({
  query,
  setQuery,
  generateOutput,
  isGeneratingOutput,
}) => {
  return (
    <form
      className='relative'
      onSubmit={e => {
        e.preventDefault();
        generateOutput();
      }}
    >
      <Input
        className='rounded-full h-12'
        onChange={e => setQuery(e.target.value)}
        value={query}
        placeholder='Type something...'
      />
      <button
        type='submit'
        disabled={!query.length || isGeneratingOutput}
        className='absolute right-1 bottom-1 rounded-full h-10 w-10 bg-blue-500 flex justify-center items-center disabled:bg-blue-400 disabled:opacity-75'
      >
        <Image src='/send.svg' width={24} height={24} alt='send' />
      </button>
    </form>
  );
};

export default ChatInput;
