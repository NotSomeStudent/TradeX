import React, { createContext, useReducer, useEffect, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { AuthContext } from './AuthContext';

const STORAGE_KEY = '__portfolio_blob';
const INITIAL_STATE = { cash: 100000, positions: {}, history: [] };

function portfolioReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;

    case 'BUY': {
      const { symbol, qty, price } = action;
      const cost = qty * price * 1.001; // include 0.1% fee
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
      const proceeds = qty * price * 0.999; // include 0.1% fee
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

const PortfolioContext = createContext(INITIAL_STATE);

export function PortfolioProvider({ children }) {
  const { cryptoKey } = useContext(AuthContext);
  const [state, dispatch] = useReducer(portfolioReducer, INITIAL_STATE);

  // Load existing encrypted blob or initialize new one
  useEffect(() => {
    const blob = localStorage.getItem(STORAGE_KEY);
    if (blob) {
      const decrypted = CryptoJS.AES.decrypt(blob, cryptoKey).toString(
        CryptoJS.enc.Utf8
      );
      dispatch({ type: 'LOAD', payload: JSON.parse(decrypted) });
    } else {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(INITIAL_STATE),
        cryptoKey
      ).toString();
      localStorage.setItem(STORAGE_KEY, encrypted);
    }
  }, [cryptoKey]);

  // Re-encrypt on every state change
  useEffect(() => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(state),
      cryptoKey
    ).toString();
    localStorage.setItem(STORAGE_KEY, encrypted);
  }, [state, cryptoKey]);

  const buy = (symbol, qty, price) =>
    dispatch({ type: 'BUY', symbol, qty, price });

  const sell = (symbol, qty, price) =>
    dispatch({ type: 'SELL', symbol, qty, price });

  return (
    <PortfolioContext.Provider value={{ ...state, buy, sell }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
