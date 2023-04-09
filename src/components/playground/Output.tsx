import Heading from '@components/heading/Heading';
import { FC } from 'react';
import { Loader2 } from 'lucide-react';
import { TextareaAutosize } from '@mui/material';

type Props = {
  output?: string;
  isGenerating: boolean;
};

const Output: FC<Props> = ({ output, isGenerating }) => {
  const placeholder = isGenerating
    ? 'Generating output...'
    : output
    ? output
    : 'No output yet. Try to generate something.';

  return (
    <div>
      <Heading
        size='xs'
        className='bg-slate-200 dark:bg-slate-800 w-max px-4 py-1 rounded'
      >
        Ouput
      </Heading>
      <div className='relative flex flex-col items-center'>
        <TextareaAutosize
          minRows={5}
          className='w-full bg-slate-100 dark:bg-slate-900 rounded-sm mt-3 text-black dark:text-white p-2 border border-gray-400 dark:border-gray-200 focus-visible:outline-gray-500 dark:focus-visible:outline-gray-300'
          placeholder={placeholder}
          readOnly
        />
        {isGenerating && (
          <Loader2 className='absolute top-14 animate-spin z-10 w-12 h-12 text-white' />
        )}
      </div>
    </div>
  );
};

export default Output;
