import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  return (
    <div>
      <p>Current Language: {language}</p>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>French</button>
    </div>
  );
};

export default LanguageSwitcher;
