<script lang="ts">
  let { 
    icon,
    title,
    description,
    link
  } = $props();
</script>

<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
  {#if icon}
    <img src={icon} alt={title} class="w-12 h-12 mb-4" />
  {/if}

  <h3 class="text-lg font-semibold text-gray-900 mb-2">
    {title}
  </h3>

  <p class="text-gray-600 mb-4">
    {description}
  </p>

  {#if link}
    <a href={link} class="text-blue-600 hover:text-blue-700 font-medium">
      Learn More →
    </a>
  {/if}
</div>
