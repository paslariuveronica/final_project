import React, { useContext } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState/useLocalStorageState";

const defaultAuthState = {
  token: null,
  user: null,
};

export const AuthContext = React.createContext(null);

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useLocalStorageState(defaultAuthState);

  function login(token, user) {
    setAuth({
      token,
      user,
    });
  }

  function logout() {
    setAuth(defaultAuthState);
  }

  function updateUser(userData) {
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        ...userData,
      },
    });
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
    
    );
  }

  return ctx;
}
