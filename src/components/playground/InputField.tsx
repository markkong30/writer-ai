'use client';

import { FC } from 'react';
import { Button } from '@components/button/Button';
import Heading from '@components/heading/Heading';
import { TextareaAutosize } from '@mui/material';
import { GenerateOutputParams } from '@/types/api';
import ModeDropdown from './ModeDropdown';
import { Mode } from '@lib/prompts';

type Props = {
  params: GenerateOutputParams;
  setParams: React.Dispatch<React.SetStateAction<GenerateOutputParams>>;
  generateOutput: () => void;
  isGenerating: boolean;
};

const InputField: FC<Props> = ({
  params,
  setParams,
  generateOutput,
  isGenerating,
}) => {
  const setMode = (mode: Mode) => setParams(prev => ({ ...prev, mode }));

  return (
    <div className='max-w-3xl flex flex-col gap-4 w-full mt-4'>
      <div>
        <Heading
          size='xs'
          className='bg-slate-200 dark:bg-slate-800 w-max px-4 py-1 rounded'
        >
          Input
        </Heading>
        <TextareaAutosize
          minRows={8}
          maxRows={20}
          value={params?.input || ''}
          onChange={e =>
            setParams(prev => ({ ...prev, input: e.target.value }))
          }
          placeholder='Input your text or paragraph'
          className='w-full bg-slate-100 dark:bg-slate-900 rounded-sm mt-3 text-black dark:text-white p-2 border border-gray-400 dark:border-gray-200 focus-visible:outline-gray-500 dark:focus-visible:outline-gray-300'
        />

        <div className='mt-2 flex justify-between'>
          <ModeDropdown mode={params.mode} setMode={setMode} />

          <Button
            disabled={isGenerating || !params.input}
            isLoading={isGenerating}
            onClick={generateOutput}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputField;
