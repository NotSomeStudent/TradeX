import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginModal() {
  const { cryptoKey } = useContext(AuthContext);
  // once cryptoKey is set, modal never shows
  return null;
}
