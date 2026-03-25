/**
 * Locale path utilities
 * Handles extracting locale from URL paths and managing locale-aware routing
 */

import type { SupportedLanguage } from '$lib/types';
import { LANGUAGES } from './store';

/**
 * Check if a path segment is a supported locale code
 */
export function isLocaleSegment(segment: string): segment is SupportedLanguage {
  return segment in LANGUAGES;
}

/**
 * Extract locale from URL path if first segment is a locale
 * Examples:
 *   /en/about → { locale: 'en', path: '/about' }
 *   /about → { locale: null, path: '/about' }
 *   /en → { locale: 'en', path: '/' }
 */
export function extractLocaleFromPath(pathname: string): {
  locale: SupportedLanguage | null;
  path: string;
} {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return { locale: null, path: '/' };
  }

  const firstSegment = segments[0].toLowerCase();
  
  if (isLocaleSegment(firstSegment)) {
    // Reconstruct path without locale
    const remainingPath = '/' + segments.slice(1).join('/');
    return {
      locale: firstSegment,
      path: remainingPath || '/'
    };
  }

  return { locale: null, path: pathname };
}

/**
 * Build a localized URL path
 * Examples:
 *   buildLocalePath('/about', 'es') → '/es/about'
 *   buildLocalePath('/', 'en') → '/en'
 */
export function buildLocalePath(path: string, locale: SupportedLanguage): string {
  const cleanPath = path === '/' ? '' : path;
  return `/${locale}${cleanPath}`;
}

/**
 * Get the non-localized path (strip locale prefix if present)
 */
export function getNonLocalizedPath(pathname: string): string {
  const { path } = extractLocaleFromPath(pathname);
  return path;
}

/**
 * Get locale from URL path or return null if not present
 */
export function getLocaleFromPath(pathname: string): SupportedLanguage | null {
  const { locale } = extractLocaleFromPath(pathname);
  return locale;
}
