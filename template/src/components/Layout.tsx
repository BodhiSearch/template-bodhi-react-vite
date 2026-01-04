import { useEffect } from 'react';
import { toast } from 'sonner';
import Header from './Header';
import ChatArea from './ChatArea';
import InputArea from './InputArea';
import { useChat } from '../hooks/useChat';

export default function Layout() {
  const {
    messages,
    isStreaming,
    selectedModel,
    setSelectedModel,
    sendMessage,
    clearMessages,
    error: chatError,
    clearError: clearChatError,
    models,
    isLoadingModels,
    loadModels,
  } = useChat();

  useEffect(() => {
    if (chatError) {
      toast.error(chatError, {
        onDismiss: clearChatError,
        onAutoClose: clearChatError,
      });
    }
  }, [chatError, clearChatError]);

  return (
    <div className="flex flex-col h-screen">
      <Header
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        models={models}
        isLoadingModels={isLoadingModels}
        onRefreshModels={loadModels}
      />
      <ChatArea messages={messages} isStreaming={isStreaming} />
      <InputArea onSendMessage={sendMessage} onClearMessages={clearMessages} />
    </div>
  );
}
