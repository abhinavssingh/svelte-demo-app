// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { makeSeo, type PageSeoFields, type SiteSeoDefaults } from '$lib/seo';
import { getLocaleFromRequest, getLocaleCacheHeaders } from '$lib/i18n';
import { getNonLocalizedPath, getLocaleFromPath } from '$lib/i18n/path';
import { fetchBuilderBatch } from '$lib/builders';

// Field names with data. prefix for Builder.io API query filtering
const SEO_FIELDS = [
  'data.pagetitle',
  'data.pagedescription',
  'data.canonicalurl',
  'data.metatitle',
  'data.metadescription',
  'data.ogtitle',
  'data.ogdescription',
  'data.ogimage',
  'data.ogurl',
  'data.ogtype'
];

export const load: LayoutServerLoad = async ({ url, request, setHeaders }) => {
  const path = url.pathname;
  
  // Extract locale from URL path if present (e.g., /en/about → en, /about)
  // Otherwise fall back to query param or Accept-Language header
  const pathLocale = getLocaleFromPath(path);
  const locale = pathLocale || getLocaleFromRequest(
    request.headers.get('accept-language') || undefined,
    url.searchParams.get('locale') || undefined
  );

  // Get non-localized path for Builder.io queries
  // e.g., /en/about → /about, /about → /about
  const builderPath = getNonLocalizedPath(path);

  // Batch fetch page SEO and global settings in parallel
  const { pageSeo, siteSeo } = await fetchBuilderBatch({
    pageSeo: {
      model: 'demo-home-page',
      urlPath: builderPath,
      locale,
      fields: SEO_FIELDS 
    },
    siteSeo: {
      model: 'svelte-global-settings',
      locale,
      fields: SEO_FIELDS 
    }
  });

  const pageData = (pageSeo as PageSeoFields & { title?: string; description?: string }) || {};
  const siteDefaults = (siteSeo as SiteSeoDefaults) || {};

  // Build final SEO with fallbacks
  const seo = makeSeo(builderPath, pageData, siteDefaults, url.origin);

  // Set cache headers at layout level (applies to all routes)
  // NOTE: Only call setHeaders() once per request in SvelteKit - do not duplicate in child pages
  // Strategy: Cache 60s CDN + 24h stale-while-revalidate, with Vary header for locale
  setHeaders(getLocaleCacheHeaders());

  return { seo, locale };
};
