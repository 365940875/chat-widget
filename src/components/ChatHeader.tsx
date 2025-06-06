import React, { useCallback, useState } from 'react';

interface ChatHeaderProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isOnline?: boolean;
  isMinimized?: boolean;
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

const MinimizeIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20,14H4V10H20" />
  </svg>
);

const MaximizeIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12,18.17L8.83,15L7.42,16.41L12,21L16.58,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.42,7.59L8.83,9L12,5.83Z" />
  </svg>
);

const BotAvatar = () => (
  <div className="bot-avatar">
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M21,9V7H3V9H21M21,16V14H3V16H21M12,12A2,2 0 0,1 14,14V18A2,2 0 0,1 12,20A2,2 0 0,1 10,18V14A2,2 0 0,1 12,12Z" />
    </svg>
  </div>
);

const OnlineIndicator = ({ isOnline }: { isOnline: boolean }) => (
  <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
    <div className="status-dot"></div>
    <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
  </div>
);

function ChatHeader({ 
  onClose, 
  onMinimize, 
  onMaximize,
  isOnline = true,
  isMinimized = false
}: ChatHeaderProps) {

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <header 
      className="chat-header"
      role="banner"
    >
      <div className="header-left">
        <BotAvatar />
        <div className="header-info">
          <h1 id="chat-header">
            AI Assistant
          </h1>
          {!isMinimized && (
            <div className="header-status">
              <OnlineIndicator isOnline={isOnline} />
            </div>
          )}
        </div>
      </div>
      
      <div className="header-actions">
        {isMinimized && onMaximize && (
          <button
            onClick={onMaximize}
            onKeyDown={(e) => handleKeyDown(e, onMaximize)}
            aria-label="Expand"
            tabIndex={0}
            className="header-button maximize-button"
            title="Expand"
          >
            <MaximizeIcon />
          </button>
        )}
        
        {!isMinimized && onMinimize && (
          <button
            onClick={onMinimize}
            onKeyDown={(e) => handleKeyDown(e, onMinimize)}
            aria-label="Minimize"
            tabIndex={0}
            className="header-button minimize-button"
            title="Minimize"
          >
            <MinimizeIcon />
          </button>
        )}
        
        {onClose && (
          <button
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            aria-label="Close chat assistant"
            tabIndex={0}
            className="header-button close-button"
            title="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </header>
  );
}

export default React.memo(ChatHeader);
