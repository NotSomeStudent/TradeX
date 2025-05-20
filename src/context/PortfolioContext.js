import React, { createContext, useReducer, useEffect, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { AuthContext } from './AuthContext';

const STORAGE_KEY = '__portfolio_blob';
const INITIAL = { cash: 100000, positions: {}, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'BUY': {
      const { symbol, qty, price } = action;
      const cost = qty * price * 1.001; // 0.1% fee
      return {
        ...state,
        cash: state.cash - cost,
        positions: {
          ...state.positions,
          [symbol]: (state.positions[symbol] || 0) + qty
        },
        history: [
          ...state.history,
          { type: 'BUY', symbol, qty, price, time: Date.now() }
        ]
      };
    }
    case 'SELL': {
      const { symbol, qty, price } = action;
      const proceeds = qty * price * 0.999;
      return {
        ...state,
        cash: state.cash + proceeds,
        positions: {
          ...state.positions,
          [symbol]: (state.positions[symbol] || 0) - qty
        },
        history: [
          ...state.history,
          { type: 'SELL', symbol, qty, price, time: Date.now() }
        ]
      };
    }
    default:
      return state;
  }
}

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const { cryptoKey } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, INITIAL);

  // Decrypt or initialize on load
  useEffect(() => {
    const blob = localStorage.getItem(STORAGE_KEY);
    if (blob) {
      const dec = CryptoJS.AES.decrypt(blob, cryptoKey).toString(CryptoJS.enc.Utf8);
      dispatch({ type: 'LOAD', payload: JSON.parse(dec) });
    } else {
      const enc = CryptoJS.AES.encrypt(JSON.stringify(INITIAL), cryptoKey).toString();
      localStorage.setItem(STORAGE_KEY, enc);
    }
  }, [cryptoKey]);

  // Encrypt on change
  useEffect(() => {
    const enc = CryptoJS.AES.encrypt(JSON.stringify(state), cryptoKey).toString();
    localStorage.setItem(STORAGE_KEY, enc);
  }, [state, cryptoKey]);

  const buy = (s, q, p) => dispatch({ type: 'BUY', symbol: s, qty: q, price: p });
  const sell = (s, q, p) => dispatch({ type: 'SELL', symbol: s, qty: q, price: p });

  return (
    <PortfolioContext.Provider value={{ ...state, buy, sell }}>
      {children}
    </PortfolioContext.Provider>
  );
}
