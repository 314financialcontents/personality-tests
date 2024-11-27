import React, { useState, useEffect } from 'react';
import { Header } from "./components/header";
import { Form } from "./components/form";

function App() {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const translationsModule = await import(`./lang/${language}.json`);
      setTranslations(translationsModule.default);
    };

    loadTranslations();
  }, [language]);

  return (
    <>
      <Header language={language} setLanguage={setLanguage} translations={translations} />
      <Form language={language} translations={translations} />
    </>
  );
}

export default App;
