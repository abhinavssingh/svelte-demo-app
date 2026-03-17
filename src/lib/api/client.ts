/**
 * API Client for Builder.io and External Data Fetching
 * Handles all HTTP requests with proper error handling and caching
 */

import type { APIResponse, BuilderContentData, PageData, ContentQuery } from '$lib/types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class APIClient {
  private baseUrl: string;
  private builderApiKey: string;
  private cache: Map<string, CacheEntry<any>> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes default TTL

  constructor(baseUrl: string = '', builderApiKey: string = '') {
    this.baseUrl = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    this.builderApiKey = builderApiKey || import.meta.env.VITE_BUILDER_API_KEY || '';
  }

  /**
   * Fetch content from Builder.io
   */
  async getBuilderContent(
    model: string,
    locale?: string,
    options?: Partial<ContentQuery>
  ): Promise<APIResponse<BuilderContentData[]>> {
    try {
      const url = new URL('https://cdn.builder.io/api/v3/content/' + model);
      url.searchParams.set('apiKey', this.builderApiKey);

      if (locale) {
        url.searchParams.set('locale', locale);
      }

      if (options?.limit) {
        url.searchParams.set('limit', options.limit.toString());
      }

      if (options?.offset) {
        url.searchParams.set('offset', options.offset.toString());
      }

      const response = await this.request<{ results: BuilderContentData[] }>(url.toString());

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data.results || []
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to fetch Builder content'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Fetch a specific page's full data including content and SEO
   */
  async getPageData(slug: string, locale: string = 'en'): Promise<APIResponse<PageData>> {
    const cacheKey = `page:${slug}:${locale}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        return { success: true, data: cached.data };
      }
    }

    try {
      // Fetch from API endpoint
      const response = await this.request<PageData>(
        `${this.baseUrl}/api/pages/${slug}?locale=${locale}`
      );

      if (response.success && response.data) {
        // Cache the result
        this.cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
          ttl: this.cacheTTL
        });

        return { success: true, data: response.data };
      }

      return {
        success: false,
        error: response.error || 'Page not found'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generic GET request with error handling
   */
  async get<T>(url: string, options?: RequestInit): Promise<APIResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Generic POST request with error handling
   */
  async post<T>(url: string, data: any, options?: RequestInit): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(data)
    });
  }

  /**
   * Core request method with error handling and retry logic
   */
  private async request<T>(
    url: string,
    options?: RequestInit,
    retries: number = 3
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...options?.headers
        }
      });

      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          // Rate limited, retry after delay
          await new Promise((resolve) => setTimeout(resolve, 1000 * (4 - retries)));
          return this.request<T>(url, options, retries - 1);
        }

        const error = await response.text();
        return {
          success: false,
          error: `HTTP ${response.status}: ${error}`
        };
      }

      const data: T = await response.json();
      return { success: true, data };
    } catch (error) {
      if (retries > 0 && error instanceof TypeError) {
        // Network error, retry
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.request<T>(url, options, retries - 1);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Clear cache for a specific key or all cache
   */
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Set cache TTL
   */
  setCacheTTL(ttl: number): void {
    this.cacheTTL = ttl;
  }
}

// Export singleton instance
export const apiClient = new APIClient();

export default apiClient;
