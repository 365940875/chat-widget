import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import MessageBubble from './MessageBubble';
import { Sender, Message } from '../types/Sender';

interface ChatMessagesProps {
  messages: Message[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const previousMessagesLength = useRef(messages.length);

  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
      const scrolled = !isAtBottom;
      
      setIsUserScrolled(scrolled);
      
      if (isAtBottom) {
        setHasNewMessages(false);
      }
    }
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto' 
      });
    }
    setHasNewMessages(false);
    setIsUserScrolled(false);
  }, []);

  const handleNotificationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToBottom(true);
    }
  };

  const handleNotificationClick = () => {
    scrollToBottom(true);
  };

  const lastMessage = useMemo(() => {
    return messages.length > 0 ? messages[messages.length - 1] : null;
  }, [messages]);

  useEffect(() => {
    if (messages.length > previousMessagesLength.current && lastMessage) {
      if (lastMessage.sender === Sender.USER) {
        setTimeout(() => scrollToBottom(true), 100);
      } else if (lastMessage.sender === Sender.BOT) {
        if (isUserScrolled) {
          setHasNewMessages(true);
        } else {
          setTimeout(() => scrollToBottom(true), 100);
        }
      }
    }
    
    previousMessagesLength.current = messages.length;
  }, [messages.length, lastMessage?.sender, lastMessage?.text, isUserScrolled, scrollToBottom]);

  useEffect(() => {
    scrollToBottom(false);
  }, [scrollToBottom]);

  return (
    <div className="chat-messages">
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="chat-messages-container"
        id="chat-messages"
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
        tabIndex={0}
      >
        {/* should use id as the key but we don't have it in this demo*/}
        {messages.map((msg, idx) => (
          <MessageBubble 
            key={idx}
            sender={msg.sender} 
            text={msg.text} 
            messageIndex={idx}
          />
        ))}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>
      
      {hasNewMessages && (
        <button
          onClick={handleNotificationClick}
          onKeyDown={handleNotificationKeyDown}
          aria-label="Scroll to new message"
          tabIndex={0}
          className="new-message-notification"
        >
          New message ↓
        </button>
      )}
    </div>
  );
}

export default ChatMessages;
