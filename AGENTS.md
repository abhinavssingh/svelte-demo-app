# Publish SvelteKit + Builder.io Integration

A production-ready SvelteKit 2 application fully integrated with Builder.io Publish for visual site building and content management.

## Tech Stack

- **Frontend**: SvelteKit 2.53.2 + Svelte 5.53.5 + TypeScript 5.9.3
- **Styling**: TailwindCSS 4.2.1 with PostCSS
- **Builder.io SDK**: @builder.io/sdk-svelte 5.2.0
- **Build Tool**: Vite 7.3.1
- **Package Manager**: npm
- **Linting**: ESLint 9 + Prettier
- **Type Checking**: TypeScript 5

## Project Structure

```
src/
├── app.html                      # Main app template
├── app.css                       # Global styles with TailwindCSS imports
├── app.d.ts                      # TypeScript declarations
├── hooks.server.ts               # Server-side init + auto-locale redirect
├── params/
│   └── locale.ts                 # Route param matcher for valid locales
├── routes/
│   ├── +layout.server.ts        # Global SEO data loading
│   ├── +layout.svelte           # Root layout with language detection
│   ├── api/
│   │   └── builder/
│   │       └── components/      # GET: Return available components
│   │           └── +server.ts
│   └── [lang=locale]/           # Locale-validated route segment
│       └── [...path]/           # Catch-all path for pages
│           ├── +page.server.ts  # Load content with path normalization
│           └── +page.svelte     # Render with Content component
│
├── lib/
│   ├── builders/
│   │   ├── customComponents.ts  # Svelte components + metadata
│   │   ├── integration.ts       # Builder.io SDK initialization
│   │   ├── registry.ts          # Component registry
│   │   ├── index.ts             # Barrel exports
│   │   └── builder.server.ts    # Builder.io fetch utilities
│   ├── api/
│   │   └── client.ts            # API client with caching
│   ├── i18n/
│   │   ├── store.ts             # Translations (10 languages)
│   │   ├── server.ts            # Server locale utilities
│   │   ├── path.ts              # URL path/locale extraction
│   │   └── index.ts             # Barrel exports
│   ├── components/
│   │   ├── layout/              # Header, Button, etc.
│   │   ├── hero/                # Hero sections
│   │   └── features/            # Feature cards
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   └── utils/
│       └── index.ts             # Utility functions
│
.builder/
└── rules/                       # AI instruction files
    ├── README.md
    ├── application-overview.mdc
    ├── component-architecture.mdc
    ├── builder-integration.mdc
    └── i18n-guidelines.mdc
```

## Key Features

### Builder.io Integration

- **Custom Components**: Svelte components registered with Builder.io SDK
- **Content Rendering**: Content component with customComponents prop for visual editing
- **Type-Safe**: Full TypeScript support with Svelte 5 runes
- **SDK Integration**: `@builder.io/sdk-svelte` 5.2.0
- **No Devtools Required**: Components available in Builder.io visual editor by default

### Component Architecture

Modular, composable components using Svelte 5 runes:

```svelte
<script lang="ts">
  import { Content } from '@builder.io/sdk-svelte';
  import { CUSTOM_COMPONENTS } from '$lib/builders/customComponents';

  let { data } = $props();
</script>

<Content 
  model="page" 
  content={data.content} 
  customComponents={CUSTOM_COMPONENTS} 
/>
```

### Internationalization with Locale-Prefixed URLs

10 languages with automatic browser language detection and URL-based routing:

**URL Structure:**
- `http://localhost:3000/en/` → English home page
- `http://localhost:3000/es/about` → Spanish about page
- `http://localhost:3000/` → Auto-redirects to `/en/` or user's browser language

**Using translations:**

```svelte
<script>
  import { t, currentLanguage, availableLanguages } from '$lib/i18n/store';
</script>

<h1>{$t('nav.home')}</h1>
```

**Supported Locales:** en, es, fr, de, it, ja, zh, pt, ru, ar

**Key Features:**
- ✅ Automatic redirect based on Accept-Language header
- ✅ URL-based locale: `/locale/path` structure
- ✅ Path normalization for Builder.io queries
- ✅ RTL support (Arabic)

## Development Commands

```bash
npm run dev          # Start development server (includes Builder.io Devtools)
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type check with svelte-check
npm run lint         # Lint with ESLint and Prettier
npm run format       # Format code with Prettier
```

## Quick Start with Builder.io

### 1. Setup API Keys

Edit `.env.local` with your Builder.io credentials:
```env
PUBLIC_VITE_BUILDER_SPACE_ID=your_space_id
PUBLIC_BUILDER_API_KEY=your_key
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open Builder.io Visual Editor

Go to https://builder.io to access your space. Your Svelte components will be available in the component palette:
- Hero
- FeatureCard
- Header
- Button

### 4. Create and Edit Pages

1. In Builder.io, click "Add Builder Page"
2. Give it a URL path (e.g., `/about`) - **no locale prefix needed**
3. Click "Edit" to open visual builder
4. Drag and drop your custom components
5. Configure component properties
6. Publish when ready
7. Pages auto-available at all locales:
   - `http://localhost:3000/en/about`
   - `http://localhost:3000/es/about`
   - `http://localhost:3000/fr/about`
   - etc.

## Component Development

### Register New Component

1. **Create your Svelte component** using Svelte 5 runes:

```svelte
<!-- src/lib/components/custom/MyComponent.svelte -->
<script lang="ts">
  interface Props {
    title?: string;
    items?: Array<{ name: string }>;
  }

  const { title = 'Default', items = [] } = $props<Props>();
</script>

<div class="space-y-4">
  <h2 class="text-2xl font-bold">{title}</h2>
  {#each items as item}
    <div class="bg-white p-4 rounded-lg shadow">
      {item.name}
    </div>
  {/each}
</div>
```

2. **Register in customComponents.ts**:

```ts
// src/lib/builders/customComponents.ts
import MyComponent from '$lib/components/custom/MyComponent.svelte';

export const CUSTOM_COMPONENTS = [
  {
    component: MyComponent,
    name: 'MyComponent',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Default Title'
      },
      {
        name: 'items',
        type: 'array'
      }
    ]
  },
  // ... other components
];
```

3. **Use in your pages** - components automatically available in Builder.io editor

## Production Deployment

- **Development**: `npm run dev` for local development with Builder.io Devtools
- **Build**: `npm run build` creates optimized production build
- **Preview**: `npm run preview` to preview production build
- **Type Check**: `npm run check` for TypeScript validation
- **Environment**: Set PUBLIC_BUILDER_API_KEY and PUBLIC_VITE_BUILDER_SPACE_ID

## Architecture Notes

### Large Application Structure

The project is organized for scalability:

- **Modular components**: Each component is self-contained and reusable
- **Centralized registry**: All components registered in `$lib/builders/registry.ts`
- **API-driven**: Data flows through typed API layer
- **i18n first-class**: Language support built from the start
- **Type-safe throughout**: Full TypeScript for developer confidence

### Key Files

- **`src/hooks.server.ts`**: App initialization, auto-redirect to locale URLs
- **`src/params/locale.ts`**: Route param matcher for valid locales
- **`$lib/i18n/server.ts`**: Server locale detection and cache headers
- **`$lib/i18n/path.ts`**: URL path/locale extraction utilities
- **`$lib/builders/registry.ts`**: Component registry
- **`$lib/builders/builder.server.ts`**: Builder.io fetch utilities
- **`$lib/builders/integration.ts`**: Builder SDK initialization
- **`src/routes/api/builder/`**: Builder.io API endpoints

### Builder.io Integration Points

1. **Auto Redirect**: `src/hooks.server.ts` redirects `/path` → `/locale/path` based on browser language
2. **Path Normalization**: `src/routes/[lang=locale]/[...path]/+page.server.ts` strips locale before querying Builder
3. **Component Registry**: `/api/builder/components` endpoint provides metadata
4. **Component Dragging**: Builder.io visual editor discovers components from registry
5. **Type System**: Props → Builder inputs (automatic)
6. **Content Rendering**: `Content` component with `customComponents` prop

## Best Practices

### Component Guidelines

1. **Always export props** - Make everything a prop for Builder.io compatibility
2. **Type props strictly** - Use TypeScript for IDE support
3. **Responsive design** - Use Tailwind breakpoints (sm, md, lg, xl)
4. **Accessibility** - Include semantic HTML and ARIA labels
5. **Dark mode ready** - Use Tailwind dark: classes when applicable

### i18n Guidelines

1. **Use key-based translations** - e.g., `$t('nav.home')`
2. **Update store.ts** - Add translations there, not in components
3. **Format dates with store** - Use locale-aware formatting
4. **RTL support** - Built-in for Arabic and other RTL languages

### API Client Usage

```ts
// Always use apiClient for data fetching
import { apiClient } from '$lib';

// With proper error handling
const result = await apiClient.getPageData('about', 'en');
if (!result.success) {
  console.error(result.error);
} else {
  // Use result.data
}
```

### Type Safety

```ts
// Import types from $lib/types
import type { PageData, ComponentConfig, SEOData } from '$lib/types';

// Use in component props
export let page: PageData;
export let config: ComponentConfig;
```

## Common Tasks

### Add a new language

1. Add to `LANGUAGES` object in `$lib/i18n/store.ts`
2. Add translations to `translations` object
3. Verify RTL setting if needed

### Create API endpoint

1. Create in `src/routes/api/endpoint/+server.ts`
2. Return JSON with APIResponse type
3. Use error handling pattern

### Cache API responses

```ts
// Already configured in apiClient
apiClient.setCacheTTL(10 * 60 * 1000); // 10 minutes
```

### Register component programmatically

```ts
import { registerComponent } from '$lib/builders/registry';

registerComponent('MyComponent', {
  name: 'MyComponent',
  // ... config
});
```

## API Endpoints

### GET `/api/builder/components`

**Purpose**: Returns available custom components for Builder.io CMS

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "component": "SvelteComponent",
      "name": "Hero",
      "inputs": [
        { "name": "title", "type": "string", "defaultValue": "Title" }
      ]
    }
  ],
  "count": 4
}
```

**Used by**: Builder.io visual editor for component palette discovery

## Troubleshooting

### Not redirecting to locale URL
- Ensure `src/hooks.server.ts` is properly imported in `src/app.html`
- Check `src/params/locale.ts` is valid TypeScript
- Verify Accept-Language header is sent by browser
- Clear cache and restart dev server

### Components not appearing in Builder.io
- Verify API keys in `.env.local`
- Check components are exported from `customComponents.ts`
- Component names must match between registration and imports
- Clear browser cache and refresh Builder.io editor

### Content not rendering on published pages
- Check page slug in Builder.io has NO locale prefix (e.g., `/about`, not `/en/about`)
- Verify `PUBLIC_BUILDER_API_KEY` is set in `.env.local`
- Ensure page is published in Builder.io
- Check network tab for API errors in browser console
- Verify `/` (root) page is published for home page rendering

### i18n not updating
- Use `$t()` store function, not direct translation object
- Subscribe to `$currentLanguage` to trigger reactivity
- Verify translation keys exist in `store.ts`
- Check language matches browser's Accept-Language header

## Resources

- [Builder.io Docs](https://www.builder.io/c/docs)
- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte 5 Docs](https://svelte.dev/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Builder SDK Svelte](https://github.com/BuilderIO/builder)
