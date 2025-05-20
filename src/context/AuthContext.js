import React, { createContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

export const AuthContext = createContext();
const SALT = 'unique-salt-string';
const ITER = 1500;
const KEY_SIZE = 256/32;

export function AuthProvider({ children }) {
  const [cryptoKey, setCryptoKey] = useState(null);
  const [checking, setChecking] = useState(true);

  const deriveKey = pass => 
    CryptoJS.PBKDF2(pass, SALT, { keySize: KEY_SIZE, iterations: ITER });

  useEffect(() => {
    async function init() {
      const pass = prompt('Enter access passphrase:');
      if (!pass) return window.location.reload();
      try {
        const key = deriveKey(pass);
        // test decrypt (no-throw)
        const blob = localStorage.getItem('__portfolio_blob');
        if (blob) CryptoJS.AES.decrypt(blob, key).toString(CryptoJS.enc.Utf8);
        setCryptoKey(key);
      } catch {
        alert('Invalid passphrase. Reload to retry.');
        return window.location.reload();
      } finally {
        setChecking(false);
      }
    }
    init();
  }, []);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading…
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ cryptoKey }}>
      {children}
    </AuthContext.Provider>
  );
}
