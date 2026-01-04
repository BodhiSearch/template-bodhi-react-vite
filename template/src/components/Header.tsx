import { useBodhi } from '@bodhiapp/bodhi-js-react';
import { Settings } from 'lucide-react';
import StatusIndicator from './StatusIndicator';
import ModelSelector from './ModelSelector';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: string[];
  isLoadingModels: boolean;
  onRefreshModels: () => void;
}

export default function Header({
  selectedModel,
  setSelectedModel,
  models,
  isLoadingModels,
  onRefreshModels,
}: HeaderProps) {
  const { clientState, isReady, isServerReady, auth, isAuthenticated, login, logout, showSetup } =
    useBodhi();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      {/* Left: Branding */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold" data-testid="app-title">
          Demo Chat
        </h1>
        <span className="text-sm text-gray-500" data-testid="app-subtitle">
          powered by Bodhi Browser Extension
        </span>
      </div>

      {/* Center: Model selector */}
      <ModelSelector
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        models={models}
        isLoadingModels={isLoadingModels}
        onRefreshModels={onRefreshModels}
      />

      {/* Right: Status & Controls */}
      <div className="flex items-center gap-3">
        {/* Status Indicators */}
        <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
          <StatusIndicator
            label="Client"
            status={isReady}
            tooltip={isReady ? 'Client ready' : 'Client not ready'}
          />
          <StatusIndicator
            label="Server"
            status={isServerReady}
            tooltip={isServerReady ? 'Server ready' : 'Server not ready'}
          />
          <span className="text-xs text-gray-600" title="Connection mode">
            mode={clientState.mode || 'unknown'}
          </span>
        </div>

        {/* Setup Button */}
        <Button onClick={showSetup} variant="ghost" size="icon" title="Settings">
          <Settings />
        </Button>

        {/* Login/Logout Button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700" title={auth.user?.email}>
              {auth.user?.name || auth.user?.email || 'User'}
            </span>
            <Button onClick={logout} variant="ghost">
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={login}>Login</Button>
        )}
      </div>
    </header>
  );
}
