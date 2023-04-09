import { FC } from 'react';
import { Metadata } from 'next';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import DocumentationTabs from '@components/documentation/DocumentationTabs';
import { metaDescription } from '@lib/constants';
import DocumentationParams from '@components/documentation/DocumentationParams';
import DocumentationModes from '@components/documentation/DocumentationModes';

export const metadata: Metadata = {
  title: 'AuthorAI API | Documentation',
  description: metaDescription,
};

const Documentation: FC = () => {
  return (
    <>
      <div className='container max-w-7xl mx-auto mt-12 py-20'>
        <div className='flex flex-col items-center gap-6'>
          <Heading>Making a request</Heading>
          <Paragraph>api/v1/generate</Paragraph>
          <DocumentationTabs />
          <DocumentationParams />
          <DocumentationModes />
        </div>
      </div>
    </>
  );
};

export default Documentation;
