const colors = require('tailwindcss/colors');
const svelteUx = require('svelte-ux/plugins/tailwind.cjs');

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/layerchart/**/*.{svelte,js}',
		'./node_modules/svelte-ux/**/*.{svelte,js}'
	],
	theme: {
		extend: {}
	},

	ux: {
		themes: {
			light: {
				'color-scheme': 'light',
				primary: 'hsl(213.0769 31.9672% 52.1569%)',
				secondary: 'hsl(210 34.0426% 63.1373%)',
				accent: 'hsl(193.3333 43.3735% 67.451%)',
				neutral: 'hsl(220 16.4835% 35.6863%)',
				info: 'hsl(311.0526 20.2128% 63.1373%)',
				success: 'hsl(92.4 27.7778% 64.7059%)',
				warning: 'hsl(40 70.5882% 73.3333%)',
				danger: 'hsl(354.2553 42.3423% 56.4706%)',
				'surface-100': 'hsl(217.5 26.6667% 94.1176%)',
				'surface-200': 'hsl(218.1818 26.8293% 91.9608%)',
				'surface-300': 'hsl(218.8235 27.8689% 88.0392%)'
			}
		}
	},

	plugins: [
		svelteUx // uses hsl() color space by default. To use oklch(), use: svelteUx({ colorSpace: 'oklch' }),
	]
};
