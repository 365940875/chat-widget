import React, { useMemo } from 'react';
import { Sender } from '../types/Sender';

interface MessageBubbleProps {
  sender: Sender;
  text: string;
  messageIndex: number;
}

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
);

const BotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14A7,7 0 0,1 13,21C13,21.34 13.04,21.67 13.09,22H10.91C10.96,21.67 11,21.34 11,21A7,7 0 0,1 4,14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M9,11A1,1 0 0,0 8,12A1,1 0 0,0 9,13A1,1 0 0,0 10,12A1,1 0 0,0 9,11M15,11A1,1 0 0,0 14,12A1,1 0 0,0 15,13A1,1 0 0,0 16,12A1,1 0 0,0 15,11M11,14H13L12.5,16H11.5L11,14Z" />
  </svg>
);

function MessageBubble({ sender, text, messageIndex }: MessageBubbleProps) {
  const isUser = sender === Sender.USER;
  
  const formattedText = useMemo(() => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }, [text]);
  return (
    <div
      className={`message-container ${isUser ? 'user' : 'bot'}`}
      role="group"
      aria-labelledby={`message-${messageIndex}`}
    >
      {!isUser && (
        <div className="avatar bot">
          <BotIcon />
        </div>
      )}
      
      <div className={`message-content ${isUser ? 'user' : 'bot'}`}>
        <div className={`sender-label ${isUser ? 'user' : 'bot'}`}>
          {isUser ? 'You' : 'Bot'}
        </div>
        
        <div
          id={`message-${messageIndex}`}
          role="article"
          aria-label={`${isUser ? 'You' : 'Assistant'} said: ${text}`}
          className={`message-bubble ${isUser ? 'user' : 'bot'}`}
        >
          <span className="sr-only">
            {isUser ? 'You said:' : 'Assistant said:'}
          </span>
          {formattedText}
        </div>
      </div>
      
      {isUser && (
        <div className="avatar user">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default React.memo(MessageBubble);
