import type { PageServerLoad } from './$types';
import { PUBLIC_BUILDER_API_KEY } from '$env/static/public';
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const content = await fetchOneEntry({
        model: 'demo-home-page',
        apiKey: PUBLIC_BUILDER_API_KEY,
        options: getBuilderSearchParams(url.searchParams),
        userAttributes: {
            urlPath: url.pathname || '/',
        }
    });

    // Extract SEO data from the Builder entry (make layout generic)
    const seo = content?.data ?? {
        title: content?.data?.metatitle ?? '',
        description: content?.data?.metadescription ?? '',
        canonical: url.href,
        ogTitle: content?.data?.ogtitle ?? content?.data?.metatitle ?? '',
        ogDescription: content?.data?.ogdescription ?? content?.data?.metadescription ?? '',
        ogImage: content?.data?.ogimage ?? '',
        ogUrl: content?.data?.ogurl ?? ''
    };

    // CDN caching: 60s TTL + 24h SWR
    setHeaders({
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=86400'
    });

    return { content, seo };
};

