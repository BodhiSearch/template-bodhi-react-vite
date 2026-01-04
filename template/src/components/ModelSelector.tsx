import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: string[];
  isLoadingModels: boolean;
  onRefreshModels: () => void;
}

export default function ModelSelector({
  selectedModel,
  setSelectedModel,
  models,
  isLoadingModels,
  onRefreshModels,
}: ModelSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={selectedModel} onValueChange={setSelectedModel} disabled={models.length === 0}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="No models loaded" />
        </SelectTrigger>
        <SelectContent>
          {models.map(model => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={onRefreshModels}
        variant="ghost"
        size="icon"
        title="Refresh models"
        disabled={isLoadingModels}
      >
        <RefreshCw className={isLoadingModels ? 'animate-spin' : ''} />
      </Button>
    </div>
  );
}
