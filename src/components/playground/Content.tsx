'use client';

import { FC } from 'react';
import InputField from './InputField';
import Output from './Output';

import { useGenerate } from './useGenerate';

type Props = {
  apiKey: string;
};

const Content: FC<Props> = ({ apiKey }) => {
  const { params, setParams, output, generateOutput, isGenerating } =
    useGenerate(apiKey);

  return (
    <div className='max-w-3xl flex flex-col gap-16 w-full mt-4'>
      <InputField
        params={params}
        setParams={setParams}
        generateOutput={generateOutput}
        isGenerating={isGenerating}
      />
      <div className='border border-dashed border-gray-200'></div>

      <Output output={output} isGenerating={isGenerating} />
    </div>
  );
};

export default Content;
