'use client';

import { FC, useState } from 'react';
import InputField from './InputField';
import Output from './Output';

type Props = {
	apiKey: string;
};

const Content: FC<Props> = ({ apiKey }) => {
	const [output, setOutput] = useState('');

	return (
		<div className="max-w-3xl flex flex-col gap-16 w-full mt-4">
			<InputField apiKey={apiKey} setOutput={setOutput} />
			<div className="border border-dashed border-gray-200"></div>

			<Output output={output} />
		</div>
	);
};

export default Content;
