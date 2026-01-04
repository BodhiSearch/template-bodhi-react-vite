import { useState, useEffect, useCallback, useRef } from 'react';
import { useBodhi } from '@bodhiapp/bodhi-js-react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function useChat() {
  const { client, isAuthenticated, isReady } = useBodhi();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadingModelsRef = useRef(false);

  // Load models from API
  const loadModels = useCallback(async () => {
    // Guard against double-invocation (StrictMode)
    if (isLoadingModelsRef.current) return;
    isLoadingModelsRef.current = true;

    setIsLoadingModels(true);
    try {
      const modelIds: string[] = [];
      for await (const model of client.models.list()) {
        modelIds.push(model.id);
      }
      setModels(modelIds);
      if (modelIds.length > 0 && !selectedModel) {
        setSelectedModel(modelIds[0]);
      }
    } catch (err) {
      console.error('Failed to fetch models:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
    } finally {
      setIsLoadingModels(false);
      isLoadingModelsRef.current = false;
    }
  }, [client, selectedModel]);

  // Auto-load models when ready and authenticated
  useEffect(() => {
    if (isReady && isAuthenticated && models.length === 0 && !isLoadingModels) {
      loadModels();
    }
  }, [isReady, isAuthenticated, models.length, isLoadingModels, loadModels]);

  // Clear all chat data when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      // Cancel any ongoing streaming
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
      // Reset state
      setMessages([]);
      setSelectedModel('');
      setModels([]);
      setError(null);
    }
  }, [isAuthenticated]);

  const sendMessage = async (prompt: string) => {
    if (!selectedModel) {
      setError('Please select a model first');
      return;
    }

    setError(null);
    setIsStreaming(true);

    // Create abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Build conversation history
    const conversationMessages: ChatMessage[] = [...messages, { role: 'user', content: prompt }];

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);

    // Add empty assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const stream = client.chat.completions.create({
        model: selectedModel,
        messages: conversationMessages,
        stream: true,
      });

      for await (const chunk of stream) {
        // Check if aborted
        if (abortController.signal.aborted) {
          break;
        }
        const content = chunk.choices?.[0]?.delta?.content || '';
        if (content) {
          setMessages(prev => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: updated[lastIndex].content + content,
            };
            return updated;
          });
        }
      }
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    messages,
    isStreaming,
    selectedModel,
    setSelectedModel,
    sendMessage,
    clearMessages,
    error,
    clearError,
    models,
    isLoadingModels,
    loadModels,
  };
}
