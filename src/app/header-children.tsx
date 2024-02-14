"use client";

import { Header } from "../client/components/navs/Header/Header";
import { AuthContextProvider } from "../client/context/AuthContext";

export default function HeaderChildren({ children }) {
  return (
    <AuthContextProvider>
      <Header />
      {children}
    </AuthContextProvider>
  )
}