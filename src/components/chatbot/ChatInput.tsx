import { Input } from '@components/input/Input';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  generateOutput: () => void;
};

const ChatInput: FC<Props> = ({ query, setQuery, generateOutput }) => {
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
        className='absolute right-1 bottom-1 rounded-full h-10 w-10 bg-blue-500 flex justify-center items-center'
      >
        <Image src='/send.svg' width={24} height={24} alt='send' />
      </button>
    </form>
  );
};

export default ChatInput;
