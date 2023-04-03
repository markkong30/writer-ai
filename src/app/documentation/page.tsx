import { FC } from 'react';
import { Metadata } from 'next';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import DocumentationTabs from '@components/documentation-tabs/DocumentationTabs';
import { metaDescription } from '@lib/constants';

export const metadata: Metadata = {
	title: 'WriterAI API | Documentation',
	description: metaDescription
};

const Documentation: FC = () => {
	return (
		<div className="container max-w-7xl mx-auto mt-12 pt-20">
			<div className="flex flex-col items-center gap-6">
				<Heading>Making a request</Heading>
				<Paragraph>api/v1/generate</Paragraph>
				<DocumentationTabs />
			</div>
		</div>
	);
};

export default Documentation;
