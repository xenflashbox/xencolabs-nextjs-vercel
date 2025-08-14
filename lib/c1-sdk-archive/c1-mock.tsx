"use client";
import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface C1ChatProps {
  apiKey: string;
  title: string;
  instructions?: string;
  initialMessages?: Message[];
}

export const C1Chat: React.FC<C1ChatProps> = ({ 
  apiKey, 
  title, 
  instructions = "I'm a helpful assistant.",
  initialMessages = [] 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: `This is a mock implementation of the C1Chat component. Your API key "${apiKey}" would be used in the actual implementation. You asked: "${inputValue}"`
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm opacity-80">Using mock C1Chat implementation</p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white ml-auto' 
                : 'bg-white border border-gray-200'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {instructions && <p>Instructions: {instructions}</p>}
        </div>
      </form>
    </div>
  );
};
