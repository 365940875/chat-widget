import { responses } from '../data/responses';

export function matchIntent(message: string): string {
  const lower = message.toLowerCase();

  for (const resp of responses) {
    if (
      resp.keywords.some(keyword => lower.includes(keyword)) &&
      resp.intent !== 'fallback'
    ) {
      return resp.response;
    }
  }

  return responses.find(r => r.intent === 'fallback')?.response || '';
}
