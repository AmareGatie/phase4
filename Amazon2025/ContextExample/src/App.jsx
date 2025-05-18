import React from "react";
import { AppProviders } from "./context/AppProviders";
import ThemeToggle from "./Components/ThemeToggle";
import AuthButton from "./Components/AuthButton";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import Counter from "./Components/Counter";
import Cart from "./Components/Cart";

export default function App() {
  return (
    <AppProviders>
      <h1>React Context API Demo</h1>
      <ThemeToggle />
      <AuthButton />
      <LanguageSwitcher />
      <Counter />
      <Cart />
    </AppProviders>
  );
}
