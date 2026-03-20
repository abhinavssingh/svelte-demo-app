<script lang="ts">
	import { Blocks } from '@builder.io/sdk-svelte';
	let { title, description, cards = [], builderBlock } = $props();
</script>

<div class="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
	<div class="bg-gray-900 py-24 sm:py-32">
		<div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
			<h2 class="text-center text-base/7 font-semibold text-indigo-400">{title}</h2>
			<p
				class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
			>
				{@html description}
			</p>
			<div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
				<Blocks					
					parentElementId={builderBlock?.id}
					dataPath="component.options.cards"
					blocks={cards}
				/>
			</div>
		</div>
	</div>
</div>
