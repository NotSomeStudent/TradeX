import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginModal() {
  // We already handle passphrase in AuthContext,
  // so no UI needed here. Return null.
  const { cryptoKey } = useContext(AuthContext);
  return null;
}
