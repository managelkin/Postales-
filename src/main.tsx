import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    // Wait for DOM to finish loading just in case the HTML element comes later
    const handleDOMReady = () => {
      const delayedRoot = document.getElementById('root');
      if (delayedRoot) {
        createRoot(delayedRoot).render(
          <StrictMode>
            <App />
          </StrictMode>,
        );
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMReady);
    } else {
      handleDOMReady();
    }
  }
};

mountApp();
