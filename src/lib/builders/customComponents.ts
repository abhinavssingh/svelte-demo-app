/**
 * Custom Components for Builder.io
 * Export components as an array to pass to the Content component
 */

import Hero from '$lib/components/hero/Hero.svelte';
import FeatureCard from '$lib/components/features/FeatureCard.svelte';
import Header from '$lib/components/layout/Header.svelte';
import Button from '$lib/components/layout/Button.svelte';
import Card from '$lib/components/features/Card.svelte';

export const CUSTOM_COMPONENTS = [
	{
		component: Hero,
		name: 'Hero',
		inputs: [
			{ name: 'title', type: 'string', defaultValue: 'Welcome to Our Site' },
			{ name: 'description', type: 'string', defaultValue: 'Build amazing experiences' },
			{ name: 'backgroundImage', type: 'image' },
			{ name: 'ctaText', type: 'string', defaultValue: 'Get Started' },
			{ name: 'ctaLink', type: 'link' },
			{ name: 'height', type: 'string', defaultValue: '80vh' }
		]
	},
	{
		component: FeatureCard,
		name: 'FeatureCard',
		canHaveChildren: true,
		inputs: [
			{ name: 'title', type: 'string', defaultValue: 'Feature Title' },
			{ name: 'description', type: 'richText', defaultValue: 'Feature description' },
			{ name: 'cards', type: 'uiBlocks', max: 6, defaultValue: [] }
		],
		shouldReceiveBuilderProps: {
			builderBlock: true,
			builderContext: true,
			builderComponents: true,
			builderLinkComponent: true
		}
	},
	{
		component: Card,
		name: 'Card',
		inputs: [
			{ name: 'title', type: 'string', defaultValue: 'Card title' },
			{ name: 'description', type: 'richText', defaultValue: 'Card description' },
			{ name: 'image', type: 'image' },
			{ name: 'link', type: 'link' }
		]
	},
	{
		component: Header,
		name: 'Header',
		inputs: [
			{ name: 'logo', type: 'image' },
			{ name: 'logoText', type: 'string', defaultValue: 'Brand' },
			{ name: 'navItems', type: 'array' },
			{ name: 'sticky', type: 'boolean', defaultValue: true }
		]
	},
	{
		component: Button,
		name: 'Button',
		inputs: [
			{ name: 'text', type: 'string', defaultValue: 'Click Me' },
			{ name: 'link', type: 'link' },
			{
				name: 'variant',
				type: 'string',
				defaultValue: 'primary',
				options: [
					{ label: 'Primary', value: 'primary' },
					{ label: 'Secondary', value: 'secondary' },
					{ label: 'Outline', value: 'outline' },
					{ label: 'Ghost', value: 'ghost' }
				]
			},
			{
				name: 'size',
				type: 'string',
				defaultValue: 'md',
				options: [
					{ label: 'Small', value: 'sm' },
					{ label: 'Medium', value: 'md' },
					{ label: 'Large', value: 'lg' }
				]
			}
		]
	}
];
