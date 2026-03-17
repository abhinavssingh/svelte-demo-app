/**
 * Core Types for Builder.io Integration
 */

export interface BuilderContentData {
  id: string;
  name: string;
  data: Record<string, any>;
  variations?: BuilderVariation[];
  published?: string;
  lastUpdated?: string;
  meta?: Record<string, any>;
}

export interface BuilderVariation {
  id: string;
  name: string;
  percentage: number;
  testRatio?: number;
}

export interface ComponentConfig {
  name: string;
  inputs?: InputType[];
  hideFromUI?: boolean;
  image?: string;
  defaultStyles?: Record<string, string>;
  description?: string;
}

export interface InputType {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'richText' | 'image' | 'color' | 'link';
  defaultValue?: any;
  required?: boolean;
  options?: Array<{ label: string; value: any }>;
  helperText?: string;
}

export interface PageData {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: BuilderContentData;
  seo?: SEOData;
  language: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContentQuery {
  model: string;
  apiKey: string;
  locale?: string;
  limit?: number;
  offset?: number;
  query?: Record<string, any>;
}

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'zh' | 'pt' | 'ru' | 'ar';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}
