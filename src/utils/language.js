import { DEFAULT_LANG } from '../constants/languages';

const language = (defaultValue) => {
  const lang = navigator.language || null;
  switch (lang) {
    case 'en':
    case 'en-EN':
      return 'en';

    case 'ru':
      return 'ru';
    default: return defaultValue;
  }
};

let currentLang;
// eslint-disable-next-line no-restricted-globals
const { pathname } = location;
if (/^(\/[\w]{2}\/).*/.test(pathname) === true) {
  currentLang = DEFAULT_LANG;

  const test = pathname.split('/').filter((s) => s.length !== 0);
  if (test.length && test[0] !== currentLang) {
    // eslint-disable-next-line prefer-destructuring
    currentLang = test[0];
  }
} else if (!currentLang) {
  currentLang = language(DEFAULT_LANG);
  if (currentLang !== DEFAULT_LANG && window.location.pathname === '/') {
    window.history.replaceState({}, '', `${currentLang}/`);
  }
}

const node = document.querySelector('html[lang]');
if (node) {
  node.setAttribute('lang', currentLang);
}

const APP_LANGUAGE = currentLang.toLowerCase();

export default APP_LANGUAGE;
