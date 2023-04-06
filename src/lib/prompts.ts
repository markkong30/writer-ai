export type Mode =
	| 'extend'
	| 'shorten'
	| 'rephrase'
	| 'correct_gramma'
	| 'replace_word'
	| 'simplify'
	| 'summarize';

type ModeDetail = {
	name: string;
	description: string;
};

export const modes = [
	'extend',
	'shorten',
	'rephrase',
	'correct_gramma',
	'replace_word',
	'simplify',
	'summarize'
] as const;

export const modesDetails: ModeDetail[] = [
	{
		name: 'extend',
		description: 'adds more information or details to the text'
	},
	{
		name: 'shorten',
		description:
			'removes unnecessary words or sentences to make the text more concise'
	},
	{
		name: 'rephrase',
		description:
			'rewrites sentences to convey the same meaning but in a different way'
	},
	{
		name: 'correct_gramma',
		description: 'corrects grammatical errors in the text'
	},
	{
		name: 'replace_word',
		description:
			'replaces a word or phrase with a different word or phrase that has a similar meaning'
	},
	{
		name: 'simplify',
		description:
			'makes the text easier to understand by using simpler language and sentence structures'
	},
	{
		name: 'summarize',
		description:
			'condenses the text into a shorter version while retaining the main ideas'
	}
];

export const getPrompts = (mode: Mode, input: string) => {
	switch (mode) {
		case 'extend':
			return `Extend the following sentence and make it more contentful: "${input}"`;

		case 'shorten':
			return `Shorten the following sentence without changing its meaning: "${input}"`;

		case 'rephrase':
			return `Rephrase the following sentence to make it more clear: "${input}"`;

		case 'correct_gramma':
			return `Correct the grammar of the following sentence: "${input}". If the original text is already correcy, return the same text as the output`;

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
