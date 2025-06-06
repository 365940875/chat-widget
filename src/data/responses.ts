export const responses = [
  {
    intent: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
    response: 'Hello! How can I help you today?',
  },
  {
    intent: 'business_hours',
    keywords: ['business hours', 'hours', 'open', 'close', 'time', 'operating hours'],
    response: 'Our business hours are Monday to Friday, 9 AM to 6 PM. We also provide online customer support on weekends.',
  },
  {
    intent: 'contact_support',
    keywords: ['contact support', 'contact', 'support', 'customer service', 'help'],
    response: 'You can contact our customer support team through:\n• Phone: 400-123-4567\n• Email: support@example.com\n• Live chat: Available 24/7',
  },
  {
    intent: 'return_policy',
    keywords: ['return policy', 'return', 'refund', 'exchange', 'policy'],
    response: 'We offer a 30-day hassle-free return policy:\n• Items must be in original packaging and condition\n• Please keep your purchase receipt\n• Contact support to initiate a return',
  },
  {
    intent: 'payment_methods',
    keywords: ['payment methods', 'payment', 'pay', 'billing', 'accept'],
    response: 'We accept multiple payment methods:\n• Credit Cards (Visa, MasterCard, Amex)\n• PayPal\n• Apple Pay\n• Google Pay\n• Bank Transfer',
  },
  {
    intent: 'delivery_time',
    keywords: ['delivery', 'shipping', 'delivery time', 'how long', 'take'],
    response: 'Delivery timeframes:\n• Local area: 1-2 business days\n• Domestic: 2-3 business days\n• National: 3-7 business days\n• Remote areas may require additional time',
  },
  {
    intent: 'product',
    keywords: ['price', 'cost', 'product', 'service'],
    response: 'We offer a variety of products and services. What are you interested in?',
  },
  {
    intent: 'fallback',
    keywords: [],
    response: "I'm sorry, I didn't quite understand your question. You can try clicking one of the quick questions below, or rephrase your question.",
  },
];
