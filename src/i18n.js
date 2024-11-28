import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Carga de traducciones desde archivos
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Integración con React
  .init({
    fallbackLng: 'es', // Idioma por defecto si no se encuentra el idioma detectado
    debug: false, // Habilita mensajes de depuración en consola
    interpolation: {
      escapeValue: false, // React ya se encarga de escapar los valores
    },
    backend: {
      loadPath: '/personality-tests/locales/{{lng}}/translation.json'
  }
  });

export default i18n;
