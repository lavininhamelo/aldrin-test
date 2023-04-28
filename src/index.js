import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CoinProvider } from './contexts/CoinsContext';
import { getBoards, getCoinInfo } from "./api";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoinProvider getBoards={getBoards} getCoinInfo={getCoinInfo}>
      <App />
    </CoinProvider>
  </React.StrictMode>
);

