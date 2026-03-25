/**
 * Internationalization module - re-exports i18n utilities
 * Client: store, languages, translations
 * Server: locale detection, Builder.io options, cache headers
 * Path utilities: locale extraction and URL path management
 */

// Client-side exports
export * from './store';

// Server-side exports (only available in SSR context)
export * from './server';

// Path utilities (works in both client and server)
export * from './path';
