<script>
	import Header from '$lib/components/Header.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import '../lib/styles.css';
	import ShareCard from '$lib/assets/sharecard.jpg';
	import { Button, Icon } from 'svelte-ux';
	import { setConstituency } from '$lib/utils';
	import data from '$lib/data/data.json';
	import InfoPopover from '$lib/components/InfoPopover.svelte';
	import { mdiGithub } from '@mdi/js';
</script>

<Seo
	seoTitle="What's the neta in your constituency up to?"
	seoDesc="Find out more about your constituency's representative, their declared assets, criminal cases, and attendance in the Lok Sabha."
	keywords={['elections', 'india', 'constituency', 'neta', 'dashboard']}
	siteName="What's your neta up to?"
	twitter="thedivtagguy"
	shareImg={ShareCard}
/>

<main
	class="min-h-[90vh] overflow-hidden h-fit flex flex-col w-full justify-center items-center max-w-6xl md:mx-auto mt-2 mb-4 md:mb-8"
>
	<Header />
	<main
		class="flex flex-col items-center justify-center w-full px-2 pb-2 md:py-2 md:px-0 md:flex-row"
	>
		<slot></slot>
	</main>
	<section class="self-start w-full pt-2 pl-4 mx-2 mt-1 mb-4 md:pl-0 md:mx-0">
		<h2 class="inline-flex items-center font-bold text-neutral">
			Browse MPs recontesting in 2024 <InfoPopover
				text="List including only individuals who filed affidavits as of April 24th, 2024"
			/>
		</h2>
		<div
			class="grid grid-flow-row grid-cols-1 gap-2 pt-4 md:max-w-fit md:w-full max-w-[300px] text-sm gr md:grid-flow-col md:grid-rows-12 recontesting text-neutral-800"
		>
			{#each [...new Set(data
						.filter((mps) => mps.recontesting)
						.map((item) => item.state_ut_name))].sort() as state_ut_name}
				<h3
					class="inline-flex items-center w-2/3 m-0 ml-1 font-bold leading-none text-neutral-500 md:w-full"
				>
					{state_ut_name}
				</h3>

				{#each data
					.filter((mps) => mps.state_ut_name === state_ut_name && mps.recontesting)
					.sort((a, b) => a.candidate.localeCompare(b.candidate)) as mps}
					<Button
						fullWidth
						on:click={() => {
							setConstituency(mps.ls_seat_name);
							window.scrollTo(0, 0);
						}}
						classes={{
							root: ' text-neutral-200 font-normal'
						}}
						variant="default"
						size="sm">{mps.candidate}</Button
					>
				{/each}
			{/each}
		</div>
	</section>
</main>
<footer class="max-w-6xl px-4 py-4 mx-2 mb-4 md:mb-8 bg-surface-100 md:mx-auto">
	<div
		class="flex divide-y-[1px] md:divide-y-0 md:divide-x-[1px] justify-between md:flex-row flex-col"
	>
		<div class="pb-4 pr-4 md:w-1/2 md:pb-0">
			<h3 class="text-sm font-semibold text-neutral-600">Methodology</h3>
			<p class="max-w-lg pt-2 text-xs text-left text-neutral-500">
				This is a small project made as part of OpenCity.in's April 2024 Elections Datajam. Election
				affidavits filed by candidates during the 2019 and 2024 general elections was scraped from
				MyNeta. Legislative activity of representatives in the 17th Lok Sabha (2019-2024) was
				scraped from PRS India.
				<br />
				<br />

				Data on age, attendance and questions, are from PRS India. Other data is from MyNeta, as per
				2019 and 2024 (where available) election affidavits. Attendance shown is the average
				attendance percentage across parliamentary sessions where the neta's attendance was tracked.
			</p>
		</div>
		<div class="py-4 text-left md:pl-4 md:py-0 md:w-1/2">
			<h3 class="text-sm font-semibold text-neutral-600">Data Sources</h3>

			<ul
				class=" align-bottom text-left list-outside max-w-[20rem] gap-2 flex flex-col pt-2 text-neutral-500 text-xs"
			>
				<li>
					<a href="https://github.com/Vonter/india-election-affidavits"
						>Election affidavits filed by candidates, compiled from MyNeta, by Vonter</a
					>
				</li>
				<li>
					<a href="https://github.com/Vonter/india-representatives-activity"
						>Legislative activity of parliamentary representatives, compiled from PRS India, by
						Vonter</a
					>
				</li>
				<li>
					<a href="https://github.com/shijithpk/2024_maps_supplement/"
						>Lok Sabha constituencies Shapefile, compiled by Shijith PK</a
					>
				</li>
			</ul>
		</div>
		<div class="flex flex-col justify-between py-4 text-left md:pl-4 md:py-0 md:w-1/4">
			<p class="max-w-lg pt-2 text-xs text-left text-neutral-500">
				Developed by <a href="https://twitter.com/thedivtagguy">Aman Bhargava</a>.
				<br />
				Data by <a href="https://twitter.com/Vonterinon">Vivek Matthew</a> and additional inputs by
				<a href="https://twitter.com/bengawalk">Pravar Chaudhary</a>
			</p>
			<div>
				<a
					href="https://github.com/thedivtagguy/whoismyneta"
					class="text-xs underline text-neutral-500"
					target="_blank"
				>
					<span>
						<Icon data={mdiGithub} class="inline-block w-4 h-4" />
					</span>
					View source on GitHub</a
				>
				<p class="text-[0.6rem] uppercase text-neutral-500">
					Last updated: {new Date().toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	a {
		@apply text-neutral-500 underline;
	}

	a:hover {
		@apply text-neutral-600 underline font-medium;
	}

	:global(.recontesting button) {
		text-align: left !important;
		margin: none;
		display: block;
		padding: 8px 5px;
	}
</style>
