<script lang="ts">
	let { title, description, image, link, cardIndex = 0 } = $props();

	// Determine CSS classes based on card position (nth-child)
	const getCardClasses = (index: number) => {
		const baseClasses = 'relative';
		const nthClasses = [
			'max-lg:row-start-1',           // card 1
			'max-lg:row-start-2 lg:col-start-2', // card 2
			'max-lg:row-start-3 lg:row-start-1', // card 3
			'max-lg:row-start-4 lg:row-start-2', // card 4
			'max-lg:row-start-5 lg:col-start-3', // card 5
			'max-lg:row-start-6 lg:row-start-2'  // card 6
		];
		return `${baseClasses} ${nthClasses[index] || nthClasses[0]}`;
	};
</script>

<div class={getCardClasses(cardIndex)}>
	<div class="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl"></div>
	<div
		class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"
	>
		<div class="px-8 pt-8 sm:px-10 sm:pt-10">
			<p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">{title}</p>
			<p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
				{description}
			</p>
		</div>
		<div
			class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2"
		>
			<img alt="" src={image} class="w-full max-lg:max-w-xs" />
		</div>
	</div>
	<div class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl"
	></div>
</div>
