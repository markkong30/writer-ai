import { motion } from 'framer-motion';
import { FC } from 'react';
import Welcome from './Welcome';
import { X as Close } from 'lucide-react';
import Chat from './Chat';

type Props = {
  closeChat: () => void;
  completeWelcome: boolean;
  goToChat: () => void;
};

const ChatInterface: FC<Props> = ({ closeChat, completeWelcome, goToChat }) => {
  return (
    <motion.div
      className='absolute top-[-500px] right-0 shadow'
      drag
      draggable
      dragMomentum={false}
    >
      {completeWelcome ? <Chat /> : <Welcome goToChat={goToChat} />}
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
