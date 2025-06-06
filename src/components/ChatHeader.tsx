import React, { useCallback } from 'react';

interface ChatHeaderProps {
  onClose?: () => void;
}

const CloseIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  </svg>
);

function ChatHeader({ onClose }: ChatHeaderProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose?.();
    }
  }, [onClose]);

  return (
    <header 
      className="chat-header"
      role="banner"
    >
      <h1 id="chat-header">
        Chat Assistant
      </h1>
      {onClose && (
        <button
          onClick={onClose}
          onKeyDown={handleKeyDown}
          aria-label="Close chat assistant"
          tabIndex={0}
          className="close-button"
        >
          <CloseIcon />
        </button>
      )}
    </header>
  );
}

export default React.memo(ChatHeader);
