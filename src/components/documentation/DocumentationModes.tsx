import Badge from '@components/badge/Badge';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import { modesDetails } from '@lib/prompts';

const DocumentationModes = () => {
	return (
		<div className="max-w-3xl flex flex-col gap-4 w-full mt-4">
			<Heading size="xs">Modes</Heading>
			<Paragraph className="text-start" size="sm">
				These is the list of available modes:
			</Paragraph>
			<ul className="text-slate-700 dark:text-white list-none">
				{modesDetails.map((mode, i) => (
					<li
						key={i}
						className="before:content-['•'] dark:before:text-white before:mr-2 before:text-black mb-2"
					>
						<Badge>{mode.name} :</Badge>
						<span className="ml-2">{mode.description}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DocumentationModes;
