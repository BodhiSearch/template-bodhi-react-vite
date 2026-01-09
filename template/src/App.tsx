import { useEffect, useState } from 'react';
import { BodhiProvider, useBodhi } from '@bodhiapp/bodhi-js-react';
import { Toaster } from '@/components/ui/sonner';
import { AUTH_CLIENT_ID, AUTH_SERVER_URL } from './env';
import Layout from './components/Layout';

function AppContent() {
  const { clientState, showSetup } = useBodhi();
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    const shouldAutoOpen =
      clientState.status === 'direct-not-connected' ||
      clientState.status === 'extension-not-found';

    if (shouldAutoOpen && !hasAutoOpened) {
      showSetup();
      setHasAutoOpened(true);
    }
  }, [clientState.status, hasAutoOpened, showSetup]);

  return (
    <>
      <Layout />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <BodhiProvider
      authClientId={AUTH_CLIENT_ID}
      clientConfig=\{{
        ...(AUTH_SERVER_URL && { authServerUrl: AUTH_SERVER_URL }),
      }}
      basePath="/{{projectName}}/"
    >
      <AppContent />
    </BodhiProvider>
  );
}

export default App;
