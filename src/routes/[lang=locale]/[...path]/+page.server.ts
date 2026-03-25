import type { PageServerLoad } from './$types';
import { PUBLIC_BUILDER_API_KEY } from '$env/static/public';
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';
import type { SupportedLanguage } from '$lib/types';

export const load: PageServerLoad = async ({ params, url }) => {
    // Extract locale and path from URL segments
    const locale = params.lang as SupportedLanguage;
    
    // Build the non-localized path from remaining path param
    // params.path is like 'about', 'products/details', empty string for root
    const pathSegments = (params.path || '').split('/').filter(Boolean);
    const builderUrlPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/';

    // Prepare Builder.io options from query params
    const customParams = Object.fromEntries(
        [...url.searchParams.entries()]
    );

    const content = await fetchOneEntry({
        model: 'demo-home-page',
        apiKey: PUBLIC_BUILDER_API_KEY,
        options: {
            locale,
            previewingBuild: true,
            ...customParams,
            ...getBuilderSearchParams(url.searchParams)
        },
        userAttributes: {
            // Use non-localized path for Builder.io content query
            // Builder.io content is published at paths like '/', '/about', not '/en/about'
            urlPath: builderUrlPath,
            locale
        }
    });

    return { 
        content: content || null, 
        locale 
    };
};
