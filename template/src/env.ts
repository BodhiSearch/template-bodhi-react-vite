// Environment variables with build-time validation

const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL;

// Fail build if required env vars are missing
if (!AUTH_CLIENT_ID) {
  throw new Error('VITE_AUTH_CLIENT_ID environment variable is required');
}

if (!AUTH_SERVER_URL) {
  throw new Error('VITE_AUTH_SERVER_URL environment variable is required');
}

export { AUTH_CLIENT_ID, AUTH_SERVER_URL };
