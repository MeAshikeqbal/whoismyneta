<script>
	import data from '$lib/data/data.json';
	import Typeahead from 'svelte-typeahead';
	import { Button } from 'svelte-ux';
	import { mdiFilterRemove } from '@mdi/js';
	import { slugify, setConstituency, setCandidate } from '$lib/utils';
	import { selectedCandidate, selectedConstituency, searchMode } from '$lib/store';
	import { goto } from '$app/navigation';

	$: searchType = $searchMode;

	let filteredData = data.filter((item) => item.total_assets !== undefined);

	const searchPeople = filteredData.map((item) => {
		return {
			id: slugify(item.candidate),
			text: `${item.candidate} | ${item.party_x}`
		};
	});

	const searchConstituency = filteredData.map((item) => {
		if ($selectedConstituency === null) return;
		// skip if total_assets is missing

		return {
			id: slugify(item.ls_seat_name),
			text: `${item.ls_seat_name}, ${item.state_ut_name} | <span class="text-xs">
                    ${item.candidate}
                </span>`
		};
	});

	let searchIndex = [];
	$: searchIndex = searchType === 'people' ? searchPeople : searchConstituency;

	const extract = (option) => {
		// take text out of html tags
		// and remove empty spaces
		return option.text
			.replace(/<[^>]*>?/gm, '')
			.replace(/\s+/g, ' ')
			.trim();
	};

	function handleSelect(detail) {
		if (searchType === 'location') {
			setConstituency(detail.original.id);
		} else {
			setCandidate(detail.original.id);
		}
	}
</script>

<div class="flex items-center justify-start w-full mx-auto mb-2 search-container">
	<Typeahead
		label={searchType === 'location' ? 'Search by constituency or MP' : 'Search for an MP'}
		value={$selectedConstituency.ls_seat_name ? $selectedConstituency.ls_seat_name : ''}
		{extract}
		limit={5}
		on:select={({ detail }) => handleSelect(detail)}
		on:clear={() => {
			if (searchType === 'location') {
				selectedConstituency.set({});
			} else {
				selectedCandidate.set('');
			}
		}}
		data={searchIndex}
		showDropdownOnFocus={true}
	/>
	<div class="pl-4 pt-7">
		<Button
			on:click={() => {
				$selectedConstituency = {};
				goto('/', { noScroll: true });
			}}
			icon={mdiFilterRemove}
		/>
	</div>
</div>

<style>
	.search-container {
		width: 100%;
		padding: 1rem 0;
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #4a5568;
		z-index: 1000;
		background-clip: padding-box;
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
	}

	/* Style data-svelte-typeahead */

	:global([data-svelte-typeahead], [data-svelte-typeahead] > form:nth-child(1)) {
		font-weight: 500;
	}

	:global([data-svelte-typeahead] > label) {
		font-weight: 800;
	}

	:global(.svelte-typeahead-list) {
		z-index: 1000 !important;
	}
</style>
