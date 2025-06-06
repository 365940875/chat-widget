import React, { useState, useCallback, useMemo } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickQuestions from './QuickQuestions';
import { matchIntent } from '../utils/intentMatcher';
import { Sender, Message } from '../types/Sender';

function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOnline] = useState(true); // 模拟在线状态

  const initialMessages: Message[] = useMemo(() => [
    { sender: Sender.BOT, text: 'Hello! I\'m your AI assistant. How can I help you today?' },
    { sender: Sender.BOT, text: 'I can answer various questions and provide assistance and support.' },
    { sender: Sender.BOT, text: 'Feel free to ask me anything you need help with!' },
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

  const handleClose = () => {
    setIsExpanded(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

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
    <div 
      className={`chatbot-container ${isMinimized ? 'minimized' : ''}`} 
      role="dialog" 
      aria-labelledby="chat-header" 
      aria-modal="false"
    >
      <ChatHeader 
        onClose={handleClose}
        onMinimize={isMinimized ? undefined : handleMinimize}
        onMaximize={isMinimized ? handleMaximize : undefined}
        isOnline={isOnline}
        isMinimized={isMinimized}
      />
      {!isMinimized && (
        <>
          <ChatMessages 
            messages={messages}
          />
          <QuickQuestions onQuestionClick={handleSend} />
          <ChatInput onSend={handleSend} />
        </>
      )}
    </div>
  );
}

export default ChatWidget;
