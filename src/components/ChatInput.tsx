import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const SendIcon = (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
  </svg>
);

function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (trimmed) {
      onSend(trimmed);
      setInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [input, onSend]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  }, [handleSend]);

  const isDisabled = !input.trim();
  const buttonAriaLabel = useMemo(() => 
    isDisabled ? "Please enter a message to send" : "Send message"
  , [isDisabled]);
  const buttonTitle = useMemo(() => 
    isDisabled ? "Please enter a message" : "Send message"
  , [isDisabled]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="chat-form"
      role="form"
      aria-label="Send message form"
    >
      <label htmlFor="chat-input" className="sr-only">
        Type your message
      </label>
      <input
        id="chat-input"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="chat-input"
        aria-describedby="send-button"
        aria-required="false"
        autoComplete="off"
        ref={inputRef}
      />
      <button
        id="send-button"
        type="submit"
        onClick={handleSend}
        onKeyDown={handleButtonKeyDown}
        disabled={isDisabled}
        className="send-button"
        aria-label={buttonAriaLabel}
        title={buttonTitle}
      >
        {SendIcon}
        <span className="sr-only">Send</span>
      </button>
    </form>
  );
}

export default React.memo(ChatInput);
