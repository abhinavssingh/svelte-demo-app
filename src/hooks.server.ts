/**
 * Server hook for initialization and request handling
 */

import { redirect } from '@sveltejs/kit';
import { builderIntegration } from '$lib/builders/integration';
import { getLocaleFromRequest } from '$lib/i18n/server';
import { extractLocaleFromPath, buildLocalePath } from '$lib/i18n/path';

/**
 * Initialize Builder.io and set up global state
 * This runs once per app startup
 */
export async function init() {
  builderIntegration.initialize();
}

/**
 * Handle requests - add headers, logging, and locale redirect
 */
export async function handle({ event, resolve }) {
  const { pathname } = event.url;
  const { locale: pathLocale } = extractLocaleFromPath(pathname);

  // Skip redirect for API routes and robots.txt
  const isAPIRoute = pathname.startsWith('/api');
  const isRobots = pathname === '/robots.txt';
  
  if (!isAPIRoute && !isRobots) {
    // If no locale in path, redirect to locale-prefixed URL based on browser language
    if (!pathLocale) {
      const acceptLanguage = event.request.headers.get('accept-language') || '';
      const preferredLocale = getLocaleFromRequest(acceptLanguage);

      // Build localized path and redirect (applies to all paths including root)
      const localizedPath = buildLocalePath(pathname, preferredLocale);
      throw redirect(307, localizedPath);
    }
  }

  // Add security headers
  const response = await resolve(event);

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'ALLOW-FROM http://localhost:* https://*.builder.io https://builder.io');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  // Add language header if set
  response.headers.set('Content-Language', event.request.headers.get('accept-language') || 'en');

  return response;
}
