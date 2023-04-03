export const modes = [
	'extend',
	'shorten',
	'rephrase',
	'correct_gramma',
	'replace_word',
	'simplify',
	'summarize'
] as const;

export type Mode = typeof modes[number];

export const getPrompts = (mode: Mode, input: string) => {
	switch (mode) {
		case 'extend':
			return `Extend the following sentence and make it more contentful: "${input}"`;

		case 'shorten':
			return `Shorten the following sentence without changing its meaning: "${input}"`;

		case 'rephrase':
			return `Rephrase the following sentence to make it more clear: "${input}"`;

		case 'correct_gramma':
			return `Correct the grammar of the following sentence: "${input}"`;

		case 'replace_word':
			return `Replace the underlined word in the following sentence with a synonym: "${input}"`;

		case 'simplify':
			return `Simplify the following sentence without changing its meaning: "${input}"`;

		case 'summarize':
			return `Summarize the following paragraph in one sentence: "${input}"`;

		default:
			return input;
	}
};
