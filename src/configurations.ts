const configuration = {
  apiToken: import.meta.env.VITE_API_ACCESS_TOKEN,
  auth0Domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  auth0ClientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
  auth0RedirectUri: import.meta.env.VITE_APP_AUTH0_CALLBACK_URL,
  protectedApiUrl: import.meta.env.VITE_APP_PROTECTED_API_URL,
};

export default configuration;
