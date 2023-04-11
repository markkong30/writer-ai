import {
  LocalStorageKeys,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import { useState } from 'react';

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [completeWelcome, setCompleteWelcome] = useState(
    !!getLocalStorage(LocalStorageKeys.botWelcome),
  );
  const closeChat = () => setIsOpen(false);

  const goToChat = () => {
    setLocalStorage(LocalStorageKeys.botWelcome, true);
    setCompleteWelcome(true);
  };

  return {
    isOpen,
    setIsOpen,
    closeChat,
    completeWelcome,
    goToChat,
  };
};
