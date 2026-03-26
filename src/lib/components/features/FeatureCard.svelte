<script lang="ts">
    import GridItem from '$lib/components/container/GridItem.svelte';

    let { title, description, builderBlock, builderContext } = $props();
</script>

<div class="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
    <div class="bg-gray-900 py-24 sm:py-32">
        <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 class="text-center text-base/7 font-semibold text-indigo-400">
                {title}
            </h2>

            <p
                class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
            >
                {@html description}
            </p>

            <!-- ✅ FLEX LAYOUT -->
            <div class="mt-10 sm:mt-16 flex flex-wrap gap-6">
                {#each builderBlock?.children as child}
                    <div class="w-full lg:w-[calc(33.333%-1rem)]">
                        <GridItem builderBlock={child} {builderContext} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>