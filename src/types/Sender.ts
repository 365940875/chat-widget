export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  sender: Sender;
  text: string;
} 