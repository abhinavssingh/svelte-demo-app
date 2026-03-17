import type { PageServerLoad } from './$types';
import { PUBLIC_BUILDER_API_KEY } from '$env/static/public';
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';
import { builderIntegration } from '$lib/builders/integration';

export const load: PageServerLoad = async ({ url, request, setHeaders }) => {
    // Get locale from query param or Accept-Language header
    const localeParam = url.searchParams.get('locale');
    const acceptLanguage = request.headers.get('accept-language');
    const locale = builderIntegration.getLocaleFromRequest(acceptLanguage || undefined, localeParam || undefined);

    // Create options with locale support for Builder.io localized fields
    const builderOptions = builderIntegration.getBuilderOptionsWithLocale(
        locale,
        url.searchParams
    );

    const content = await fetchOneEntry({
        model: 'demo-home-page',
        apiKey: PUBLIC_BUILDER_API_KEY,
        options: {
            ...builderOptions,
            ...getBuilderSearchParams(url.searchParams)
        },
        userAttributes: {
            urlPath: url.pathname || '/',
            locale // Include locale in user attributes for targeting
        }
    });

    // Extract SEO data from the Builder entry - handle both structures
    const seo = {
        title: content?.data?.title ?? content?.data?.metatitle ?? '',
        description: content?.data?.description ?? content?.data?.metadescription ?? '',
        canonical: url.href,
        ogTitle: content?.data?.ogTitle ?? content?.data?.ogtitle ?? content?.data?.metatitle ?? '',
        ogDescription: content?.data?.ogDescription ?? content?.data?.ogdescription ?? content?.data?.metadescription ?? '',
        ogImage: content?.data?.ogImage ?? content?.data?.ogimage ?? '',
        ogUrl: content?.data?.ogUrl ?? content?.data?.ogurl ?? url.href
    };

    // CDN caching: 60s TTL + 24h SWR (cache per locale)
    setHeaders({
        'cache-control': `public, s-maxage=60, stale-while-revalidate=86400`,
        'Vary': 'Accept-Language'
    });

    return { 
        content: content || null, 
        seo, 
        locale 
    };
};

