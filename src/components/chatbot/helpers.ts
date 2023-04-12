import { toast } from '@components/toast/Toast';
import { generateBot } from '@lib/api';
import {
  LocalStorageKeys,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Message } from './types';

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

export const useChat = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => generateBot({ query }),
    onMutate: () => {
      updateMessages(query, true);
    },
    onError: () => {
      toast({
        title: 'Error fetching bot result',
        message: 'Please try again later.',
        type: 'error',
      });
    },
    onSuccess: data => {
      updateMessages(data.output, false);
      setQuery('');
    },
  });

  const updateMessages = (text: string, fromUser: boolean) =>
    setMessages(prev => [...prev, { text, fromUser }]);

  return {
    query,
    setQuery,
    messages,
    generateOutput: mutate,
    isGeneratingOutput: isLoading,
  };
};
