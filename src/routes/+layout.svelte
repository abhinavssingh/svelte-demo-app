<script lang="ts">
  let { children } = $props();
  import { page } from '$app/state';

  const seo = $state({
    title: '',
    description: '',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: ''
  });

  // Update SEO metadata
  $effect(() => {
    const d = page.data ?? {};

    // Prefer structured `data.seo` if present, otherwise fall back to legacy fields
    const src = d.seo ?? {
      title: d.metatitle ?? d?.content?.data?.title,
      description: d.metadescription ?? d?.content?.data?.description,
      canonical: d.canonical,
      ogTitle: d.ogtitle ?? d?.content?.data?.ogTitle,
      ogDescription: d.ogdescription ?? d?.content?.data?.ogDescription,
      ogImage: d.ogimage ?? d?.content?.data?.ogImage,
      ogUrl: d.ogurl
    };

    seo.title = src.title ?? '';
    seo.description = src.description ?? '';
    seo.canonical = src.canonical ?? page?.url?.href ?? '';
    seo.ogTitle = src.ogTitle ?? src.title ?? '';
    seo.ogDescription = src.ogDescription ?? src.description ?? '';
    seo.ogImage = src.ogImage ?? '';
    seo.ogUrl = src.ogUrl ?? src.canonical ?? page?.url?.href ?? '';
  });
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <link rel="canonical" href={seo.canonical} />
  <meta property="og:title" content={seo.ogTitle} />
  <meta property="og:description" content={seo.ogDescription} />
  <meta property="og:image" content={seo.ogImage} />
  <meta property="og:url" content={seo.ogUrl} />
  <meta property="og:type" content="website" />
</svelte:head>

<header class="site-header">
  <nav class="flex gap-4 text-sm">
  </nav>
</header>

<main>
 {@render children()}
</main>

<footer class="site-footer">
</footer>
