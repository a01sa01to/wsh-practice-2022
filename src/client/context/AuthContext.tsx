"use client";

import React, { Dispatch, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthContext = createContext<{ userId: string | null, setUserId: Dispatch<SetStateAction<string>> }>({
  setUserId: () => {
    throw new Error("AuthContext value is not set");
  },
  userId: null,
});

export const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        setUserId,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { userId } = useContext(AuthContext);

  const res = useMemo(
    () => ({
      loggedIn: userId != null,
      userId,
    }),
    [userId],
  );

  return res;
};

export const useRegister = () => {
  const { setUserId } = useContext(AuthContext);

  const register = useCallback(async () => {
    const res = await fetch("/api/users/me").then((res) => {
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      return res.json();
    });

    setUserId(res.id);
  }, [setUserId]);

  return register;
};
