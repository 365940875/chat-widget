import React, { useState, useCallback, useMemo } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickQuestions from './QuickQuestions';
import { matchIntent } from '../utils/intentMatcher';
import { Sender, Message } from '../types/Sender';

function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialMessages: Message[] = useMemo(() => [
    { sender: Sender.BOT, text: 'Hello! How can I help you today?' },
    { sender: Sender.BOT, text: 'I can assist you with various questions and tasks.' },
    { sender: Sender.BOT, text: 'Feel free to ask me anything you need help with.' },
    { sender: Sender.BOT, text: 'You can ask about our products, services, or general information.' },
    { sender: Sender.BOT, text: 'What would you like to know?' },
    { sender: Sender.BOT, text: 'I\'m here to help make your experience as smooth as possible.' },
    { sender: Sender.BOT, text: 'Please don\'t hesitate to reach out if you have any questions.' },
  ], []);

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = useCallback((message: string) => {
    setMessages(prevMessages => [...prevMessages, { sender: Sender.USER, text: message }]);
    
    setTimeout(() => {
      const botResponse = matchIntent(message);
      setMessages(prevMessages => [...prevMessages, { sender: Sender.BOT, text: botResponse }]);
    }, 800);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(true);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  }, []);

  if (!isExpanded) {
    return (
      <button
        className="chatbot-bubble"
        onClick={() => setIsExpanded(true)}
        onKeyDown={handleKeyDown}
        aria-label="Open chat"
        role="button"
        tabIndex={0}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.36L2 22l5.64-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="chatbot-container" role="dialog" aria-labelledby="chat-title" aria-modal="false">
      <ChatHeader onClose={() => setIsExpanded(false)} />
      <ChatMessages 
        messages={messages}
      />
      <QuickQuestions onQuestionClick={handleSend} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatWidget;
