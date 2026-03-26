/**
 * Custom Components for Builder.io
 * Export components as an array to pass to the Content component
 */

import { Hero, FeatureCard, Header, Button, Card } from '$lib/components/';

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
			{ name: 'description', type: 'richText', defaultValue: 'Feature description' }
		],
		slots: [
			{
				name: 'children',
				helper: {
					text: 'Add Card components here on a 3-column grid (max 6 cards)',
					query: {
						'@type': '@builder.io/sdk:Element',
						component: {
							name: { $eq: 'Card' }
						}
					}
				}
			}
		],
		shouldReceiveBuilderProps: {
			builderBlock: true,
			builderContext: true,
			builderComponents: true
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
		],
		shouldReceiveBuilderProps: {
			builderBlock: true
		}
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
