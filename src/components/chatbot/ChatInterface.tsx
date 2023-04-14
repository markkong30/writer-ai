import { motion } from 'framer-motion';
import { FC } from 'react';
import Welcome from './Welcome';
import { X as Close } from 'lucide-react';
import Chat from './Chat';
import { Message } from './types';

type Props = {
  closeChat: () => void;
  completeWelcome: boolean;
  goToChat: () => void;
  query: string;
  setQuery: (text: string) => void;
  messages: Message[];
  updateBotMessage: () => void;
  generateOutput: () => void;
  isGeneratingOutput: boolean;
};

const ChatInterface: FC<Props> = ({
  closeChat,
  completeWelcome,
  goToChat,
  ...props
}) => {
  return (
    <motion.div
      className='absolute top-[-503px] right-0 shadow'
      drag
      dragMomentum={false}
    >
      {completeWelcome ? <Chat {...props} /> : <Welcome goToChat={goToChat} />}
      <button
        className='absolute top-4 right-4 text-slate-700 dark:text-white'
        onClick={closeChat}
      >
        <Close width={20} height={20} />
      </button>
    </motion.div>
  );
};

export default ChatInterface;
