<script lang="ts">
  import { Content, isPreviewing } from "@builder.io/sdk-svelte";
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import type { PageProps  } from "./$types";

  const model = "demo-home-page";

  // this data comes from the function in `+page.server.ts`, which runs on the server only
  let { data }: PageProps  = $props();

  // show unpublished content when in preview mode.
  const canShowContent = $derived(
    () => Boolean(data?.content) || isPreviewing(),
  );
</script>

{#if canShowContent}
  <section class="builder-prose">
    <div>page Title: {data.content?.data?.title || "Unpublished"}</div>
    <div>page Description: {data.content?.data?.description || "Unpublished"}</div>
    <Content {model} content={data.content} apiKey={PUBLIC_BUILDER_API_KEY} />
  </section>
{:else}
  <h1 class="text-xl font-semibold">Not found</h1>
  <p class="text-gray-600">No Builder content is published for this URL.</p>
{/if}
