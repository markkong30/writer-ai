import Link from 'next/link';

import type { Metadata } from 'next';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import { metaDescription } from '@lib/constants';
import FantasyBook from '@components/fantasy-book/FantasyBook';

export const metadata: Metadata = {
  title: 'AuthorAI API | Home',
  description: metaDescription,
};

export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
          <Heading
            size='lg'
            className='three-d text-black dark:text-light-gold'
          >
            Unlock the power <br /> of AI Writing.
          </Heading>

          <Paragraph className='max-w-xl lg:text-left'>
            Elevate your writing to the next level with AuthorAI&apos;s
            AI-powered tools, available for free with our open-source{' '}
            <Link
              href='/login'
              className='underline underline-offset-2 text-black dark:text-light-gold'
            >
              API key
            </Link>
            .
          </Paragraph>

          <div className='relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute'>
            <FantasyBook />
          </div>
        </div>
      </div>
    </div>
  );
}
