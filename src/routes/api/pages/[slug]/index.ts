/**
 * Example API endpoint for fetching page data
 * GET /api/pages/[slug]
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import type { PageData } from '$lib/types';

export const GET: RequestHandler = async ({ params, url }) => {
  const { slug } = params;
  const locale = (url.searchParams.get('locale') || 'en') as string;

  try {
    // Example page data - replace with your actual data source
    const pageData: PageData = {
      id: slug,
      title: `Page: ${slug}`,
      description: `This is the ${slug} page`,
      slug: slug,
      language: locale,
      content: {
        id: `content-${slug}`,
        name: slug,
        data: {
          title: `Welcome to ${slug}`,
          description: `This is a sample ${slug} page built with Builder.io`
        }
      },
      seo: {
        title: `${slug} | Your Site`,
        description: `This is the ${slug} page description`,
        keywords: [slug, 'page'],
        canonical: `https://example.com/${slug}`
      }
    };

    return json({
      success: true,
      data: pageData
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    return json(
      {
        success: false,
        error: 'Failed to fetch page data'
      },
      { status: 500 }
    );
  }
};
