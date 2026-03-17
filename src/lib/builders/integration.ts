/**
 * Note: @builder.io/sdk-svelte uses the Content component with customComponents prop
 * Svelte components are registered via customComponents.ts and passed to Content component
 * Localization is handled via the locale prop to resolve localized fields
 */

import { Content } from '@builder.io/sdk-svelte';
import { CUSTOM_COMPONENTS } from './customComponents';
import type { BuilderContentData } from '$lib/types';
import type { SupportedLanguage } from '$lib/types';

// Environment variables
const BUILDER_API_KEY = import.meta.env.PUBLIC_BUILDER_API_KEY || '';
const BUILDER_SPACE_ID = import.meta.env.VITE_BUILDER_SPACE_ID || '';

interface BuilderConfig {
  apiKey: string;
  spaceId?: string;
  envId?: string;
  canTrack?: boolean;
  enableVisualEditing?: boolean;
}

class BuilderIntegration {
  private config: BuilderConfig;
  private initialized = false;

  constructor(config?: Partial<BuilderConfig>) {
    this.config = {
      apiKey: config?.apiKey || BUILDER_API_KEY,
      spaceId: config?.spaceId || BUILDER_SPACE_ID,
      envId: config?.envId,
      canTrack: config?.canTrack !== false,
      enableVisualEditing: config?.enableVisualEditing !== false
    };
  }

  /**
   * Initialize Builder.io (server-side)
   */
  initialize(): void {
    if (this.initialized) {
      return;
    }

    if (!this.config.apiKey) {
      console.error('PUBLIC_BUILDER_API_KEY is not set. Builder.io will not work properly.');
      return;
    }

    this.initialized = true;
    console.log('✓ Builder.io initialized');
  }

  /**
   * Get Builder configuration
   */
  getConfig(): BuilderConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<BuilderConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Check if Builder is properly configured
   */
  isConfigured(): boolean {
    return !!this.config.apiKey;
  }

  /**
   * Export RenderContent component for use in pages
   */
  getRenderComponent() {
    return Content;
  }

  /**
   * Get custom components for the Content component
   */
  getCustomComponents() {
    return CUSTOM_COMPONENTS;
  }

  /**
   * Get locale from request headers or default to 'en'
   * Supports: Accept-Language header or locale query parameter
   * @param headerLanguage - From Accept-Language header
   * @param queryLocale - From URL query parameter
   * @returns Supported locale code
   */
  getLocaleFromRequest(
    headerLanguage?: string,
    queryLocale?: string
  ): SupportedLanguage {
    const supportedLocales: SupportedLanguage[] = ['en', 'es', 'fr', 'de', 'it', 'ja', 'zh', 'pt', 'ru', 'ar'];

    // Priority 1: Query parameter
    if (queryLocale && supportedLocales.includes(queryLocale as SupportedLanguage)) {
      return queryLocale as SupportedLanguage;
    }

    // Priority 2: Accept-Language header
    if (headerLanguage) {
      const primaryLang = headerLanguage.split('-')[0].toLowerCase();
      if (supportedLocales.includes(primaryLang as SupportedLanguage)) {
        return primaryLang as SupportedLanguage;
      }
    }

    // Default to English
    return 'en';
  }

  /**
   * Prepare options for Builder.io content fetching with locale support
   * @param locale - The locale code for localized fields
   * @param searchParams - URL search parameters
   * @returns Options object with locale for Builder API
   */
  getBuilderOptionsWithLocale(
    locale: SupportedLanguage,
    searchParams?: URLSearchParams
  ) {
    const options: Record<string, any> = {
      // Builder.io locale for resolving localized fields
      locale,
      // Include draft content in preview mode
      previewingBuild: true
    };

    // Add any custom search params
    if (searchParams) {
      searchParams.forEach((value, key) => {
        options[key] = value;
      });
    }

    return options;
  }
}

// Export singleton instance
export const builderIntegration = new BuilderIntegration();

// Re-export SDK for convenience
export { Content } from '@builder.io/sdk-svelte';
export type { BuilderContentData };

export default builderIntegration;
