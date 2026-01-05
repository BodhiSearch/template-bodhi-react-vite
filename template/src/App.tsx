import { BodhiProvider } from '@bodhiapp/bodhi-js-react';
import { Toaster } from '@/components/ui/sonner';
import { AUTH_CLIENT_ID, AUTH_SERVER_URL } from './env';
import Layout from './components/Layout';

function App() {
  return (
    <BodhiProvider
      authClientId={AUTH_CLIENT_ID}
      clientConfig=\{{
        ...(AUTH_SERVER_URL && { authServerUrl: AUTH_SERVER_URL }),
      }}
      basePath="/{{projectName}}/"
    >
      <Layout />
      <Toaster />
    </BodhiProvider>
  );
}

export default App;
