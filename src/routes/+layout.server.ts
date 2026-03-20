// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { makeSeo, type PageSeoFields, type SiteSeoDefaults } from '$lib/seo';
import { PUBLIC_BUILDER_API_KEY, PUBLIC_BUILDER_CDN_URL } from '$env/static/public';
import { builderIntegration } from '$lib/builders/integration';

const PUBLIC_KEY = PUBLIC_BUILDER_API_KEY!;
const CDN = PUBLIC_BUILDER_CDN_URL;

type BuilderEntry<T = any> = { data?: T };
type BuilderResp<T = any> = { results: BuilderEntry<T>[] };

async function builderGet<T>(
  model: string,
  params: Record<string, string | number | boolean> = {}
) {
  const qs = new URLSearchParams({ apiKey: PUBLIC_KEY });
  for (const [k, v] of Object.entries(params)) qs.set(k, String(v));
  const res = await fetch(`${CDN}/${model}?${qs.toString()}`);
  if (!res.ok) throw new Error(`Fetch ${model} failed: ${res.status}`);
  return (await res.json()) as BuilderResp<T>;
}

export const load: LayoutServerLoad = async ({ url , request}) => {
  const path = url.pathname;
  const localeParam = url.searchParams.get('locale');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = builderIntegration.getLocaleFromRequest(acceptLanguage || undefined, localeParam || undefined);

  // 1) Pull the current page’s SEO fields directly from the Page model.
  const pageResp = await builderGet<PageSeoFields & { title?: string; description?: string }>('demo-home-page', {
    limit: 1,
    'userAttributes.urlPath': path,
    // Ask only for the fields we need to keep payload small
    fields: [
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
    ].join(','),
    locale: locale
  });

  const pageData = pageResp.results[0]?.data || {};

  // 2) (Optional) Fetch global defaults from a Data Model to avoid empty OG when authors forget.
  const siteSeoResp = await builderGet<SiteSeoDefaults>('svelte-global-settings', {
    limit: 1,
    fields: [
      'data.sitename',
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
    ].join(','),
    locale: locale
  });
  const siteDefaults = siteSeoResp.results[0]?.data || {};

  // 3) Build final SEO
  const seo = makeSeo(path, pageData, siteDefaults, url.origin);
  return { seo };
};