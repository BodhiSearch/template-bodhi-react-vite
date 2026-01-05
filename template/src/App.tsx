import { BodhiProvider } from '@bodhiapp/bodhi-js-react';
import { Toaster } from '@/components/ui/sonner';
import { AUTH_CLIENT_ID, AUTH_SERVER_URL } from './env';
import Layout from './components/Layout';

{{{{raw}}}}function App() {
  return (
    <BodhiProvider
      authClientId={AUTH_CLIENT_ID}
      clientConfig={{
        ...(AUTH_SERVER_URL && { authServerUrl: AUTH_SERVER_URL }),
      }}
      basePath="/{{{{/raw}}}}{{projectName}}{{{{raw}}}}/"
    >
      <Layout />
      <Toaster />
    </BodhiProvider>
  );
}{{{{/raw}}}}

export default App;
