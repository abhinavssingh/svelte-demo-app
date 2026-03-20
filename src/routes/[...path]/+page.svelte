<script lang="ts">
  import { Content, isPreviewing } from "@builder.io/sdk-svelte";
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import { CUSTOM_COMPONENTS } from "$lib/builders/customComponents";
  import { currentLanguage } from "$lib/i18n/store";
  import type { PageProps  } from "./$types";

  const model = "demo-home-page";

  // this data comes from the function in `+page.server.ts`, which runs on the server only
  let { data }: PageProps  = $props();

  // show unpublished content when in preview mode.
  const canShowContent = data.content || isPreviewing();

  // Use locale from server data or fall back to current language store
  const locale = $derived(data?.locale || $currentLanguage);
</script>

{#if canShowContent}
  <section class="builder-prose">
    <Content 
      {model} 
      content={data.content} 
      {locale}
      apiKey={PUBLIC_BUILDER_API_KEY} 
      customComponents={CUSTOM_COMPONENTS} 
    />
  </section>
{:else}
  <h1 class="text-xl font-semibold">Not found</h1>
  <p class="text-gray-600">No Builder content is published for this URL.</p>
{/if}
