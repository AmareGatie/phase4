import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";
import { CounterProvider } from "./CounterContext";
import { CartProvider } from "./CartContext";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <CounterProvider>
            <CartProvider>{children}</CartProvider>
          </CounterProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
