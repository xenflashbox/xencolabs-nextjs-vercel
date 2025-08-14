declare module '@thesis/c1-sdk' {
  import { FC } from 'react';
  
  interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
  interface C1ChatProps {
    apiKey: string;
    title: string;
    instructions?: string;
    initialMessages?: Message[];
    [key: string]: any; // For any additional props
  }
  
  export const C1Chat: FC<C1ChatProps>;
}
