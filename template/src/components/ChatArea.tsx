import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Message from './Message';
import type { ChatMessage } from '../hooks/useChat';

interface ChatAreaProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

export default function ChatArea({ messages, isStreaming }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 mt-8">No messages yet. Start a conversation!</p>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Message key={index} role={msg.role} content={msg.content} />
              ))}
              {isStreaming && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
