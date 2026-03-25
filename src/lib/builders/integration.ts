/**
 * Note: @builder.io/sdk-svelte uses the Content component with customComponents prop
 * Svelte components are registered via customComponents.ts and passed to Content component
 * Localization is handled via the locale prop to resolve localized fields
 * 
 * IMPORTANT: Locale-related functions have been moved to $lib/i18n/server.ts
 * Use those instead of duplicating logic here.
 */
import { Content } from '@builder.io/sdk-svelte';
import { CUSTOM_COMPONENTS } from './customComponents';
import type { BuilderContentData } from '$lib/types';
import { PUBLIC_BUILDER_API_KEY, PUBLIC_VITE_BUILDER_SPACE_ID } from '$env/static/public';

// Environment variables
const BUILDER_API_KEY = PUBLIC_BUILDER_API_KEY || '';
const BUILDER_SPACE_ID = PUBLIC_VITE_BUILDER_SPACE_ID || '';

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
}

// Export singleton instance
export const builderIntegration = new BuilderIntegration();

// Re-export SDK for convenience
export { Content } from '@builder.io/sdk-svelte';
export type { BuilderContentData };

export default builderIntegration;
