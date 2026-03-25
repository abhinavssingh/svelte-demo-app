/**
 * Server-side Builder.io utilities
 * Centralized functions for fetching data from Builder.io CDN
 * Use in +page.server.ts, +layout.server.ts, and API routes
 */

import { PUBLIC_BUILDER_API_KEY, PUBLIC_BUILDER_CDN_URL } from '$env/static/public';
import type { SupportedLanguage } from '$lib/types';

const API_KEY = PUBLIC_BUILDER_API_KEY!;
const CDN_URL = PUBLIC_BUILDER_CDN_URL;

interface BuilderEntry<T = any> {
  data?: T;
}

interface BuilderResponse<T = any> {
  results: BuilderEntry<T>[];
}

interface BuilderQueryOptions {
  limit?: number;
  offset?: number;
  locale?: SupportedLanguage;
  fields?: string;
  userAttributes?: Record<string, any>;
  [key: string]: any;
}

/**
 * Fetch content from Builder.io with flexible query options
 * @param model - Builder.io model name
 * @param options - Query options (limit, offset, locale, fields, etc.)
 * @returns Builder.io response with results array
 */
export async function fetchFromBuilder<T = any>(
  model: string,
  options: BuilderQueryOptions = {}
): Promise<BuilderResponse<T>> {
  const params = new URLSearchParams();
  
  // Always add API key
  params.set('apiKey', API_KEY);
  
  // Add all query parameters
  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        // Handle special cases like userAttributes
        if (key === 'userAttributes') {
          for (const [attrKey, attrValue] of Object.entries(value)) {
            params.set(`userAttributes.${attrKey}`, String(attrValue));
          }
        } else if (key === 'fields' || key === 'locale') {
          params.set(key, String(value));
        }
      } else {
        params.set(key, String(value));
      }
    }
  }

  const url = `${CDN_URL}/${model}?${params.toString()}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Builder.io fetch failed for "${model}": ${response.status} ${response.statusText}`, errorText.slice(0, 200));
    throw new Error(`Builder.io fetch failed for "${model}": ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as BuilderResponse<T>;
  
  return data;
}

/**
 * Fetch a single entry from Builder.io model
 * Optionally filters by URL path and selects specific fields
 */
export async function fetchBuilderEntry<T = any>(
  model: string,
  urlPath: string,
  locale: SupportedLanguage = 'en',
  fields?: string[]
): Promise<T | null> {
  const fieldsList = fields?.length ? fields.join(',') : undefined;

  const data = await fetchFromBuilder<T>(model, {
    limit: 1,
    'userAttributes.urlPath': urlPath,
    ...(fieldsList && { fields: fieldsList }),
    locale
  });

  const result = data.results[0]?.data || null;
  if (!result) {
    console.warn(`No data returned for ${model} at path: ${urlPath}`, {
      locale,
      fields: fieldsList ? fieldsList.split(',').length + ' fields' : 'none',
      resultsCount: data.results.length
    });
  }
  return result;
}

/**
 * Fetch multiple entries from Builder.io with pagination
 */
export async function fetchBuilderEntries<T = any>(
  model: string,
  options: {
    limit?: number;
    offset?: number;
    locale?: SupportedLanguage;
    fields?: string[];
  } = {}
): Promise<T[]> {
  const fieldsList = options.fields?.length ? options.fields.join(',') : undefined;

  const data = await fetchFromBuilder<T>(model, {
    limit: options.limit,
    offset: options.offset,
    ...(fieldsList && { fields: fieldsList }),
    locale: options.locale
  });

  return data.results.map(entry => entry.data).filter(Boolean) as T[];
}

/**
 * Batch fetch multiple models in parallel with error handling
 * Returns single entry per key (first result for non-urlPath queries)
 */
export async function fetchBuilderBatch<T extends Record<string, any>>(
  queries: {
    [K in keyof T]: {
      model: string;
      urlPath?: string;
      locale?: SupportedLanguage;
      fields?: string[];
    };
  }
): Promise<T> {
  const results = await Promise.allSettled(
    Object.entries(queries).map(async ([key, query]) => {
      try {
        let data: any;
        
        if (query.urlPath) {
          // Fetch single entry by URL path
          data = await fetchBuilderEntry(
            query.model,
            query.urlPath,
            query.locale,
            query.fields
          );
        } else {
          // Fetch entries without URL path (typically for global/default data)
          // Return first result or null
          const entries = await fetchBuilderEntries(query.model, {
            limit: 1,
            locale: query.locale,
            fields: query.fields
          });
          data = entries[0] || null;
        }
        
        return [key, data] as const;
      } catch (error) {
        console.error(`Failed to fetch ${query.model}:`, error);
        return [key, null] as const;
      }
    })
  );

  const output: any = {};
  for (const result of results) {
    if (result.status === 'fulfilled') {
      const [key, data] = result.value;
      output[key] = data;
    }
  }
  return output;
}
