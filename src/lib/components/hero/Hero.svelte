<script lang="ts">
  let {
    title,
    subtitle,
    backgroundImage,
    ctaText,
    ctaLink,
    height
  } = $props();
</script>

<div
  class="relative w-full flex items-center justify-center overflow-hidden"
  style="height: {height || '80vh'};"
>
  <!-- Background Image -->
  {#if backgroundImage}
    <img
      src={backgroundImage}
      alt="Hero background"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>
  {:else}
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700"></div>
  {/if}

  <!-- Content -->
  <div class="relative z-10 text-center px-4">
    {#if title}
      <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
        {title}
      </h1>
    {/if}
    {#if subtitle}
      <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
        {subtitle}
      </p>
    {/if}

    <!-- CTA Button -->
    {#if ctaText && ctaLink}
      <a
        href={ctaLink}
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
      >
        {ctaText}
      </a>
    {/if}
  </div>
</div>

<style>
  :global(.hero-component) {
    @apply w-full;
  }
</style>
