import { Button } from '@components/button/Button';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  goToChat: () => void;
};

const Welcome: FC<Props> = ({ goToChat }) => {
  return (
    <div className='relative w-[300px] h-[500px] px-4 pb-4 rounded-lg dark:bg-black flex flex-col justify-center items-center gap-8 text-center'>
      <Image
        src='/robot.gif'
        width={200}
        height={200}
        alt=''
        className='-mb-8 pointer-events-none'
        priority
      />
      <Heading size='xs'>Your AI Assistant</Heading>
      <Paragraph size='sm'>
        I can provide support, answer questions, and offer guidance on how to
        use AuthorAI.
      </Paragraph>
      <Button size='lg' className='rounded-full' onClick={goToChat}>
        START CHAT
      </Button>
    </div>
  );
};

export default Welcome;
