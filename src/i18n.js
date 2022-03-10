import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANG } from './constants/languages';
import APP_LANGUAGE from './utils/language';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    preload: ['ru', 'en'],
    lng: APP_LANGUAGE,
    fallbackLng: DEFAULT_LANG,
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
    lowerCaseLng: true,
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['htmlTag', 'path'],
    },
  });

export default i18n;
