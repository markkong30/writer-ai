'use client';

import { Button } from '@components/button/Button';
import Heading from '@components/heading/Heading';
import { generateOutput } from '@lib/api';
import { TextareaAutosize } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { GenerateOutputParams } from '@/types/api';
import { FC, useState } from 'react';
import ModeDropdown from './ModeDropdown';
import { Mode } from '@lib/prompts';
import { z } from 'zod';
import { toast } from '@components/toast/Toast';

type Props = {
	apiKey: string;
	setOutput: (output: string) => void;
};

const InputField: FC<Props> = ({ apiKey, setOutput }) => {
	const [params, setParams] = useState<GenerateOutputParams>({
		input: '',
		mode: 'extend'
	});
	const { mutate, isLoading } = useMutation({
		mutationFn: () => generateOutput(params, apiKey),
		onSuccess: (data) => setOutput(data.output),
		onError: (err) => {
			toast({
				title: 'Error generating output',
				message:
					err instanceof z.ZodError ? err.message : 'Please try again later.',
				type: 'error'
			});
		}
	});

	const setMode = (mode: Mode) => setParams((prev) => ({ ...prev, mode }));

	return (
		<div className="max-w-3xl flex flex-col gap-4 w-full mt-4">
			<div>
				<Heading
					size="xs"
					className="bg-slate-200 dark:bg-slate-800 w-max px-4 py-1 rounded"
				>
					Input
				</Heading>
				<TextareaAutosize
					minRows={10}
					maxRows={20}
					value={params?.input || ''}
					onChange={(e) =>
						setParams((prev) => ({ ...prev, input: e.target.value }))
					}
					placeholder="Input your text or paragraph"
					className="w-full bg-slate-100 dark:bg-slate-900 rounded-sm mt-3 text-black dark:text-white p-2 border border-gray-400 dark:border-gray-200"
				/>

				<div className="mt-2 flex justify-between">
					<ModeDropdown mode={params.mode} setMode={setMode} />

					<Button
						disabled={isLoading}
						isLoading={isLoading}
						onClick={() => mutate()}
					>
						Generate
					</Button>
				</div>
			</div>
		</div>
	);
};

export default InputField;
