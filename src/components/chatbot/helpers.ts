import { toast } from '@components/toast/Toast';
import { generateBot } from '@lib/api';
import {
  LocalStorageKeys,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Message } from './types';

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [completeWelcome, setCompleteWelcome] = useState(
    !!getLocalStorage(LocalStorageKeys.botWelcome),
  );
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const closeChat = () => setIsOpen(false);

  const goToChat = () => {
    setLocalStorage(LocalStorageKeys.botWelcome, true);
    setCompleteWelcome(true);
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!messages.length && isOpen) {
        updateMessages('Hi there! How can I help you today?', false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    closeChat,
    completeWelcome,
    goToChat,
    query,
    setQuery,
    messages,
    generateOutput: mutate,
    isGeneratingOutput: isLoading,
  };
};
