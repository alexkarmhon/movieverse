import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App.tsx';

import './index.scss';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { StatefulAuthProvider } from './auth/StatefulAuthProvider.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StatefulAuthProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </StatefulAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
