<script lang="ts">
	import { currentLanguage } from '$lib/i18n/store';
	let { data, children } = $props();
	import '../app.css';

	// Update the language store if locale data is available
	$effect(() => {
		if (data?.locale) {
			currentLanguage.set(data.locale);
		}
	});
</script>

<svelte:head>
	<title>{data.seo.title}</title>

	{#if data.seo.description}
		<meta name="description" content={data.seo.description} />
	{/if}

	<link rel="canonical" href={data.seo.canonical} />
	<!-- Open Graph -->
	<meta property="og:title" content={data.seo.og.title} />
	{#if data.seo.og.description}
		<meta property="og:description" content={data.seo.og.description} />
	{/if}
	<meta property="og:type" content={data.seo.og.type} />
	<meta property="og:url" content={data.seo.og.url} />
	{#if data.seo.og.image}
		<meta property="og:image" content={data.seo.og.image} />
	{/if}
	{#if data.seo.og.siteName}
		<meta property="og:site_name" content={data.seo.og.siteName} />
	{/if}
</svelte:head>

<header class="site-header">
	<nav class="flex gap-4 text-sm"></nav>
</header>

<main>
	{@render children()}
</main>

<footer class="site-footer"></footer>
