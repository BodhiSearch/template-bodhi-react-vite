import { useState } from 'react';
import { useBodhi } from '@bodhiapp/bodhi-js-react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InputAreaProps {
  onSendMessage: (message: string) => Promise<void>;
  onClearMessages: () => void;
}

export default function InputArea({ onSendMessage, onClearMessages }: InputAreaProps) {
  const { isReady, isAuthenticated } = useBodhi();
  const [message, setMessage] = useState('');

  const isDisabled = !isReady || !isAuthenticated;

  const getHintText = () => {
    if (!isReady) return 'Client not ready';
    if (!isAuthenticated) return 'Please log in to send messages';
    return 'Type a message...';
  };

  const handleSubmit = async () => {
    if (isDisabled || !message.trim()) return;
    const messageToSend = message;
    setMessage('');
    await onSendMessage(messageToSend);
  };

  const handleNewChat = () => {
    onClearMessages();
    setMessage('');
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          {/* New chat button */}
          <Button
            onClick={handleNewChat}
            variant="ghost"
            size="icon"
            title="New chat"
            disabled={isDisabled}
          >
            <Plus />
          </Button>

          {/* Input field */}
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder={getHintText()}
            disabled={isDisabled}
            className="flex-1"
          />

          {/* Submit button */}
          <Button onClick={handleSubmit} disabled={isDisabled || !message.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
