<script lang="ts">
  let { title, description, image, link } = $props();
</script>

<div class="group relative h-full">
  <div class="absolute inset-px rounded-lg bg-gray-800"></div>

  <a
    href={link}
    class="relative flex h-full flex-col overflow-hidden
      rounded-[calc(var(--radius-lg)+1px)]
      no-underline text-white hover:no-underline"
  >
    <!-- ✅ IMPORTANT: h-full here -->
    <div class="flex h-full flex-col">
      <!-- TOP CONTENT -->
      <div class="px-8 pt-8 sm:px-10 sm:pt-10">
        <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
          {title}
        </p>

        <p class="mt-2 text-sm text-gray-400 max-lg:text-center">
          {@html description}
        </p>
      </div>

      <!-- ✅ FLEX FILLER (forces equal height) -->
      <div class="flex flex-1 items-center justify-center px-8 pt-10 pb-12 sm:px-10 lg:pb-2">
        {#if image}
          <img
            alt={title}
            src={image}
            class="w-full max-w-xs object-contain"
          />
        {/if}
      </div>
    </div>
  </a>

  <div
    class="pointer-events-none absolute inset-px rounded-lg
    shadow-sm outline outline-white/15"
  ></div>
</div>