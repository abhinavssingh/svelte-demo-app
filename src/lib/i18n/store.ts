/**
 * Internationalization Store
 * Manages language state and translations across the application
 */

import { writable, derived } from 'svelte/store';
import type { SupportedLanguage, LanguageConfig } from '$lib/types';

// Supported languages configuration
export const LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr'
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    direction: 'ltr'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr'
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    direction: 'ltr'
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    direction: 'ltr'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl'
  }
};

// Translation messages
const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.contact': 'Contact',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.tryAgain': 'Try Again'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.features': 'Características',
    'nav.contact': 'Contacto',
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.tryAgain': 'Intentar nuevamente'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.features': 'Caractéristiques',
    'nav.contact': 'Contact',
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    'common.tryAgain': 'Réessayer'
  },
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.features': 'Funktionen',
    'nav.contact': 'Kontakt',
    'common.loading': 'Wird geladen...',
    'common.error': 'Ein Fehler ist aufgetreten',
    'common.tryAgain': 'Versuchen Sie es erneut'
  },
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi siamo',
    'nav.features': 'Caratteristiche',
    'nav.contact': 'Contatti',
    'common.loading': 'Caricamento...',
    'common.error': 'Si è verificato un errore',
    'common.tryAgain': 'Riprova'
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.about': 'について',
    'nav.features': '機能',
    'nav.contact': 'お問い合わせ',
    'common.loading': '読み込み中...',
    'common.error': 'エラーが発生しました',
    'common.tryAgain': '再度試す'
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.features': '功能',
    'nav.contact': '联系',
    'common.loading': '加载中...',
    'common.error': '发生错误',
    'common.tryAgain': '重试'
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.features': 'Recursos',
    'nav.contact': 'Contato',
    'common.loading': 'Carregando...',
    'common.error': 'Ocorreu um erro',
    'common.tryAgain': 'Tentar novamente'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.features': 'Функции',
    'nav.contact': 'Контакт',
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.tryAgain': 'Повторить'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.features': 'ميزات',
    'nav.contact': 'اتصل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.tryAgain': 'حاول مرة أخرى'
  }
};

// Create language store
export const currentLanguage = writable<SupportedLanguage>('en');

// Detect language from browser if available
if (typeof window !== 'undefined') {
  const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
  const storedLang = localStorage.getItem('app-language') as SupportedLanguage;

  if (storedLang && Object.keys(LANGUAGES).includes(storedLang)) {
    currentLanguage.set(storedLang);
  } else if (Object.keys(LANGUAGES).includes(browserLang)) {
    currentLanguage.set(browserLang);
  }
}

// Subscribe to language changes and save to localStorage
currentLanguage.subscribe((lang) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('app-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = LANGUAGES[lang].direction;
  }
});

// Translation helper derived store
export const t = derived(currentLanguage, ($lang) => {
  return (key: string, defaultText?: string): string => {
    const message = translations[$lang]?.[key] ?? defaultText ?? key;
    return message;
  };
});

// Language config derived store
export const languageConfig = derived(currentLanguage, ($lang) => {
  return LANGUAGES[$lang];
});

// Available languages list
export const availableLanguages = Object.values(LANGUAGES);

// Supported locale codes list (for routing and validation)
export const SUPPORTED_LOCALES = Object.keys(LANGUAGES) as SupportedLanguage[];
