import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import { FC } from 'react';

type Props = {
	output?: string;
};

const Output: FC<Props> = ({ output }) => {
	return (
		<>
			<Heading
				size="xs"
				className="bg-slate-200 dark:bg-slate-800 w-max px-4 py-1 rounded"
			>
				Ouput
			</Heading>
			<Paragraph>{output}</Paragraph>
		</>
	);
};

export default Output;
