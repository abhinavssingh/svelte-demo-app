/**
 * Server hook for initialization and request handling
 */

import { builderIntegration } from '$lib/builders/integration';

/**
 * Initialize Builder.io and set up global state
 * This runs once per app startup
 */
export async function init() {
  builderIntegration.initialize();
}

/**
 * Handle requests - add headers and logging
 */
export async function handle({ event, resolve }) {
  // Add security headers
  const response = await resolve(event);

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'ALLOW-FROM http://localhost:* https://*.builder.io https://builder.io');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  // Add language header if set
  response.headers.set('Content-Language', event.request.headers.get('accept-language') || 'en');

  return response;
}
