/**
 * Locale param matcher for SvelteKit routing
 * Matches only valid supported language codes
 */

import { SUPPORTED_LOCALES } from '$lib/i18n/store';

export function match(param: string): boolean {
  return SUPPORTED_LOCALES.includes(param as any);
}
