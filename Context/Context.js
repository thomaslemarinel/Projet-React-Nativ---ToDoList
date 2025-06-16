import React, { createContext, useState } from 'react';

export const TokenContext = createContext();
export const UsernameContext = createContext();

//contextes qui permettent de partager les valeurs token et username dans les composants
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <TokenContext.Provider value={[token, setToken]}>
      <UsernameContext.Provider value={[username, setUsername]}>
        {children}
      </UsernameContext.Provider>
    </TokenContext.Provider>
  );
};
