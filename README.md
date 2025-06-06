# 🤖 Chatbot Widget

A modern embeddable chatbot component built with React + TypeScript + Vite. Provides smooth user experience and complete accessibility support.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)

## ✨ Core Features

### 🎯 Basic Functions
- **Smart Conversation**: Intent recognition system based on keyword matching
- **Quick Questions**: Preset common questions with one-click sending
- **Real-time Response**: Simulates natural conversation with realistic delays
- **Message History**: Complete conversation records and scroll management

### 🎨 User Interface
- **Expand/Collapse**: Click chat bubble to expand, ESC key for quick close
- **Avatar Distinction**: Different avatars and colors for users and bot
- **Smooth Scrolling**: Auto-scroll for new messages with manual scroll detection
- **New Message Alert**: Shows notification when user scrolls up and bot sends message

### ♿ Accessibility
- **Keyboard Navigation**: Complete Tab key navigation support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Intelligent focus control and navigation
- **High Contrast**: Clear focus indicators

## 🚀 Quick Start

### Requirements
- Node.js 16.0+
- npm 8.0+

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
Visit http://localhost:5173 to view the application

### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ChatWidget.tsx   # Main chat component
│   ├── ChatHeader.tsx   # Chat header
│   ├── ChatMessages.tsx # Message list
│   ├── MessageBubble.tsx # Single message
│   ├── ChatInput.tsx    # Input component
│   └── QuickQuestions.tsx # Quick questions
├── data/
│   └── responses.ts     # Response data configuration
├── utils/
│   └── intentMatcher.ts # Intent matching logic
├── index.css           # Global styles
└── main.tsx           # Application entry
```

## 🎮 Usage Guide

### Basic Interactions
1. **Open Chat**: Click the blue chat bubble in the bottom right corner
2. **Send Message**: Type in the input field, press Enter or click send button
3. **Quick Questions**: Click preset questions above the input field
4. **Close Chat**: Click the ✕ button in the top right or press ESC key

### Keyboard Shortcuts
- `Tab` - Navigate between interactive elements
- `Enter/Space` - Activate buttons and links
- `Escape` - Close chat window
- `Enter` - Send message in input field

### Preset Questions
- "What are your business hours?" - Business hours inquiry
- "How can I contact support?" - Support contact methods
- "What is your return policy?" - Return policy
- "What payment methods do you accept?" - Payment methods
- "How long does delivery take?" - Delivery time

## 🔧 Customization

### Modify Response Content
Edit the `src/data/responses.ts` file:

```typescript
export const responses = [
  {
    intent: 'greeting',
    keywords: ['hello', 'hi', 'hey'],
    response: 'Hello! How can I help you today?',
  },
  // Add more responses...
];
```

### Custom Styling
Modify style classes in `src/index.css`:

```css
.chatbot-container {
  /* Custom main container styles */
}

.message-bubble.user {
  /* Custom user message styles */
}

.message-bubble.bot {
  /* Custom bot message styles */
}
```

---

⭐ If this project helps you, please give it a Star!
