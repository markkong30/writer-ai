import { Metadata } from 'next';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import { metaDescription } from '@lib/constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { db } from '@lib/db';
import Content from '@components/playground/Content';

export const metadata: Metadata = {
  title: 'AuthorAI API | Playground',
  description: metaDescription,
};

const Playground = async () => {
  const user = await getServerSession(authOptions);

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user?.user.id, enabled: true },
  });

  return (
    <>
      <div className='container max-w-7xl mx-auto mt-12 py-20'>
        <div className='flex flex-col items-center gap-6'>
          <Heading>API Playground</Heading>
          <Paragraph>
            Experience the capabilities of AI in various modes through the API
            Playground.
          </Paragraph>
          <Content apiKey={apiKey?.key || ''} />
        </div>
      </div>
    </>
  );
};

export default Playground;
