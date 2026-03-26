<script lang="ts">
    import { Blocks } from '@builder.io/sdk-svelte';
    let { builderBlock, builderContext } = $props();
</script>

<Blocks
    blocks={[builderBlock]}
    context={builderContext}
/>