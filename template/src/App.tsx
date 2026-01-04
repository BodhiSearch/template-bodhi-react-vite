import { BodhiProvider } from '@bodhiapp/bodhi-js-react';
import { Toaster } from '@/components/ui/sonner';
import { AUTH_CLIENT_ID, AUTH_SERVER_URL } from './env';
import Layout from './components/Layout';

function App() {
  return (
    <BodhiProvider
      authClientId={AUTH_CLIENT_ID}
      clientConfig={{
        authServerUrl: AUTH_SERVER_URL,
      }}
      basePath="/demo-chat"
      logLevel="debug"
    >
      <Layout />
      <Toaster />
    </BodhiProvider>
  );
}

export default App;
