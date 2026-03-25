/**
 * Builder components API endpoint
 * GET /api/builder/components
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import { getComponentsList } from '$lib/builders';

export const GET: RequestHandler = async () => {
  try {
    const components = getComponentsList();

    return json({
      success: true,
      data: components,
      count: components.length
    });
  } catch (error) {
    console.error('Error fetching components:', error);
    return json(
      {
        success: false,
        error: 'Failed to fetch components'
      },
      { status: 500 }
    );
  }
};
