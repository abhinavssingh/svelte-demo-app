/**
 * Server-side locale handling for i18n
 * Centralizes locale detection and Builder.io locale configuration
 */

import type { SupportedLanguage } from '$lib/types';
import { LANGUAGES } from './store';

/**
 * Parse Accept-Language header to extract primary language code
 */
function parseAcceptLanguage(headerValue: string): string | null {
  if (!headerValue) return null;
  const primaryLang = headerValue.split('-')[0].toLowerCase();
  return primaryLang || null;
}

/**
 * Validate locale against supported languages
 */
function isValidLocale(locale: string | null | undefined): locale is SupportedLanguage {
  return locale != null && locale in LANGUAGES;
}

/**
 * Get locale from request with priority handling
 * Priority: Query parameter > Accept-Language header > Default (en)
 * 
 * @param acceptLanguage - Accept-Language header value
 * @param queryLocale - Locale from URL query parameter
 * @returns Supported locale code
 */
export function getLocaleFromRequest(
  acceptLanguage?: string,
  queryLocale?: string
): SupportedLanguage {
  // Priority 1: Query parameter (explicit user choice)
  if (isValidLocale(queryLocale)) {
    return queryLocale;
  }

  // Priority 2: Accept-Language header (browser preference)
  if (acceptLanguage) {
    const primaryLang = parseAcceptLanguage(acceptLanguage);
    if (isValidLocale(primaryLang)) {
      return primaryLang;
    }
  }

  // Default to English
  return 'en';
}

/**
 * Build locale-aware search parameters for Builder.io API
 */
interface BuilderLocaleOptions {
  locale: SupportedLanguage;
  previewingBuild?: boolean;
  customParams?: Record<string, string | number | boolean>;
}

export function getBuilderLocaleOptions(
  options: BuilderLocaleOptions
): Record<string, any> {
  return {
    locale: options.locale,
    previewingBuild: options.previewingBuild ?? true,
    ...options.customParams
  };
}

/**
 * Build cache control headers for locale-aware responses
 * Includes Vary header for Accept-Language to ensure proper caching per locale
 */
export interface CacheControlOptions {
  maxAge?: number;
  sMaxAge?: number;
  staleWhileRevalidate?: number;
}

export function getLocaleCacheHeaders(
  options: CacheControlOptions = {}
): Record<string, string> {
  const {
    maxAge = 60,
    sMaxAge = 60,
    staleWhileRevalidate = 86400
  } = options;

  return {
    'cache-control': `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
    'Vary': 'Accept-Language'
  };
}

/**
 * Get the text direction for a locale (for RTL support)
 */
export function getLocaleDirection(locale: SupportedLanguage): 'ltr' | 'rtl' {
  return LANGUAGES[locale]?.direction ?? 'ltr';
}
