import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </AuthProvider>
);
