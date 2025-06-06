import React, { useCallback } from 'react';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

function QuickQuestions({ onQuestionClick }: QuickQuestionsProps) {
  const defaultQuestions = [
    "What are your business hours?",
    "How can I contact support?",
    "What is your return policy?",
    "What payment methods do you accept?",
    "How long does delivery take?"
  ];

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, question: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onQuestionClick(question);
    }
  }, [onQuestionClick]);

  return (
    <nav 
      className="quick-questions-container"
      role="navigation"
      aria-label="Quick questions"
    >
      <div 
        className="quick-questions-scroll"
        role="group"
        aria-label="Frequently asked questions"
      >
        {defaultQuestions.map((question, index) => (
          <button
            key={index}
            className="quick-question-btn"
            onClick={() => onQuestionClick(question)}
            onKeyDown={(e) => handleKeyDown(e, question)}
            aria-label={`Ask: ${question}`}
            tabIndex={0}
            type="button"
          >
            {question}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default React.memo(QuickQuestions); 