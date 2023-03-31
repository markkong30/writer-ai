import { FC } from 'react';
import { Metadata } from 'next';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import DocumentationTabs from '@components/documentation-tabs/DocumentationTabs';

export const metadata: Metadata = {
	title: 'Similarity API | Documentation',
	description: 'Free & open-source text similarity API'
};

const Documentation: FC = () => {
	return (
		<div className="container max-w-7xl mx-auto mt-12 pt-20">
			<div className="flex flex-col items-center gap-6">
				<Heading>Making a request</Heading>
				<Paragraph>api/v1/similarity</Paragraph>
				<DocumentationTabs />
			</div>
		</div>
	);
};

export default Documentation;
