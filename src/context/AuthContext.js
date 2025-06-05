import React, { createContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

export const AuthContext = createContext();

const SALT = 'unique-salt-string-123'; // You can change this to any constant string
const ITER = 1500;
const KEY_SIZE = 256 / 32; // in words (32-bit)

export function AuthProvider({ children }) {
  const [cryptoKey, setCryptoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const deriveKey = (pass) =>
    CryptoJS.PBKDF2(pass, SALT, {
      keySize: KEY_SIZE,
      iterations: ITER
    });

  useEffect(() => {
    async function askPassphrase() {
      // Prompt user for a passphrase
      const pass = prompt('Enter access passphrase:');
      if (!pass) {
        alert('Passphrase is required.');
        window.location.reload();
        return;
      }

      try {
        const key = deriveKey(pass);
        // Attempt to decrypt existing blob (if any) to verify passphrase
        const blob = localStorage.getItem('__portfolio_blob');
        if (blob) {
          // If it fails, an exception is thrown
          CryptoJS.AES.decrypt(blob, key).toString(CryptoJS.enc.Utf8);
        }
        setCryptoKey(key);
      } catch {
        alert('Invalid passphrase. Reload to retry.');
        window.location.reload();
      } finally {
        setLoading(false);
      }
    }
    askPassphrase();
  }, []);

  if (loading) {
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
