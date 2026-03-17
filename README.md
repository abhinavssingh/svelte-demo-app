# 🚀 Quick Start Guide

## You Now Have a Production-Ready Builder.io + SvelteKit Application

### What Was Built For You

✅ **Complete Project Structure** - Organized for large-scale applications
✅ **Component System** - 4 pre-built, reusable components
✅ **Builder.io Integration** - Full SDK integration with component registry
✅ **Multilingual Support** - 10 languages (including RTL)
✅ **Type Safety** - 100% TypeScript with comprehensive types
✅ **API Integration** - Client with caching and modern endpoints
✅ **Documentation** - 1000+ lines guiding development
✅ **AI Rules** - Builder rules for consistent code generation

---

## Getting Started (5 Minutes)

### 1. Set Your API Keys

Edit `.env.local`:
```env
PUBLIC_BUILDER_API_KEY=your_key_here
VITE_BUILDER_SPACE_ID=your_space_here
```

Get keys from: https://builder.io/account/home

### 2. Components are Ready

No additional devtools installation needed. Your custom Svelte components are automatically available in Builder.io when you start the dev server.

### 3. Start Development Server

```bash
npm run dev
```

Open: http://localhost:3000

### 4. Access Builder UI

Click the **Builder logo** in the bottom right corner

### 5. Create Your First Page

1. Click **"Add Builder Page"**
2. Give it a name (becomes the URL slug)
3. Click **"Edit"** to open the visual builder
4. Drag components from the sidebar
5. Configure component properties
6. **Publish** when ready

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/lib/builders/` | Component registration & SDK |
| `src/lib/components/` | Your UI components (Hero, Features, etc.) |
| `src/lib/i18n/` | Translations (10 languages) |
| `src/lib/api/` | API client & data fetching |
| `src/lib/types/` | TypeScript definitions |
| `.builder/rules/` | AI instruction files |

---

## Important Files

- **AGENTS.md** - Full documentation (start here)
- **src/lib/builders/customComponents.ts** - Component definitions for Builder.io
- **src/routes/[...path]/+page.svelte** - Dynamic page rendering
- **src/lib/i18n/store.ts** - Translations
- **.builder/rules/** - AI guidelines

---

## Common Tasks

### Add a Translation

Edit `src/lib/i18n/store.ts` and add your key/value:

```typescript
en: {
  'nav.newPage': 'New Page',
  // ... other translations
},
es: {
  'nav.newPage': 'Nueva Página',
  // ... etc
}
```

### Add a Component

Create in `src/lib/components/`:

```svelte
<!-- src/lib/components/custom/MyComponent.svelte -->
<script>
  let title = 'Default';
  let items = [];
</script>

<div>
  <h2>{title}</h2>
  {#each items as item}
    <p>{item.name}</p>
  {/each}
</div>
```

Then register in `src/lib/builders/registry.ts`:

```typescript
registerComponent('MyComponent', {
  name: 'MyComponent',
  inputs: [
    { name: 'title', type: 'string', required: true },
    { name: 'items', type: 'array' }
  ]
});
```

### Create an API Endpoint

Create `src/routes/api/yourapi/+server.ts`:

```typescript
import { json } from '@sveltejs/kit';

export async function GET() {
  return json({ success: true, data: {} });
}
```

---

## Development Commands

```bash
npm run dev       # Start with Devtools
npm run build     # Production build
npm run preview   # Test production build
npm run check     # Type check
npm run lint      # Lint code
npm run format    # Format code
```

---

## Architecture at a Glance

```
User Creates Page in Builder UI
  ↓
Builder Stores Content
  ↓
Page Requests /api/pages/[slug]
  ↓
API Returns Page + Content
  ↓
RenderContent Displays Components
  ↓
User Sees Styled Page
```

---

## Features You Have

### Components
- ✅ Hero - Full-width banner
- ✅ FeatureCard - Feature showcase
- ✅ Header - Navigation
- ✅ Button - Multi-variant button
- ✅ RichText - Content area

### Internationalization
- ✅ 10 Language Support (en, es, fr, de, it, ja, zh, pt, ru, ar)
- ✅ RTL Support (Arabic)
- ✅ Auto Language Detection
- ✅ LocalStorage Persistence
- ✅ Easy Translation Management

### Type Safety
- ✅ Full TypeScript
- ✅ 11 Core Types
- ✅ Component Props Typing
- ✅ API Response Types

### API Features
- ✅ Typed Client
- ✅ Response Caching
- ✅ Error Handling
- ✅ Retry Logic
- ✅ Builder Integration

---

## Troubleshooting

### Builder Logo Not Showing
- Check `VITE_BUILDER_API_KEY` is set
- Check dev server is running
- Try clearing browser cache

### Components Not Appearing
- Check `src/lib/builders/registry.ts`
- Run `npm run dev` and check console
- Visit `/api/builder/components` in browser

### Translations Not Working
- Check key exists in `src/lib/i18n/store.ts`
- Use `$t('key')` not direct object access
- Check language is set in localStorage

### Build Errors
- Run `npm run check` to find issues
- Check `VITE_*` variables in .env.local
- Clear node_modules and reinstall if needed

---

## Documentation Structure

1. **AGENTS.md** - Complete reference
2. **.builder/rules/** - AI education
   - application-overview.mdc
   - component-architecture.mdc
   - builder-integration.mdc
   - i18n-guidelines.mdc

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| SvelteKit | 2.53.2 | Framework |
| Svelte | 5.53.5 | Components |
| TypeScript | 5.9.3 | Type Safety |
| TailwindCSS | 4.2.1 | Styling |
| Builder SDK | 5.2.0 | Visual Editing |
| Vite | 7.3.1 | Build Tool |

---

## Next Steps

1. ✅ Read **AGENTS.md** for complete documentation
2. ✅ Update `.env.local` with your API keys
3. ✅ Run `npm init builder.io@latest`
4. ✅ Run `npm run dev`
5. ✅ Create first page in Builder UI
6. ✅ Add translations to `src/lib/i18n/store.ts`
7. ✅ Create custom components
8. ✅ Deploy! 🎉

---

## Support Resources

- [Builder.io Docs](https://www.builder.io/c/docs)
- [SvelteKit Docs](https://kit.svelte.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Svelte Docs](https://svelte.dev/)

---

## Questions?

- Check **AGENTS.md** for detailed guides
- Check **.builder/rules/** for architecture
- Check errors in browser console
- Review component examples in `src/lib/components/`

---

**You're all set! Start building amazing sites with Builder.io! 🚀**
