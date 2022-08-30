import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    // Detect language form URL parameter
    detection: {
      order: ['path'],
      lookupFromPathIndex: 0
    },
    // Use fi as fallback
    fallbackLng: ['fi']
  });

export default i18n;
