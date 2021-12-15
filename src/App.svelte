<script>
 	import { onMount } from 'svelte'
 	import { getIdenticon } from './shared/api'

 	let id = ''
 	let base64image = ''
 	const urlParams = new URLSearchParams(window.location.search);

 	onMount(async () => {
		id = urlParams.get('id')
		if (id) {
			onInput(id)
		}
	})

 	const onInput = async val => {
		id = val
		const blob = (await getIdenticon(val))
		base64image = `data:image/png;base64,${blob}`
		urlParams.set('id', id)
	}

</script>

<main>
	<h1>Identiconner</h1>
	<p>Enter a name below to generate a brand spanking new identicon!</p>
	<input
		placeholder="Name to identiconify"
		value={id}
		on:input={e => onInput(e.target.value)}
	>
	{#if base64image}
	<img src={base64image} />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

 	input {
		margin: auto;
	}

 	img {
		width: 250px;
		height: 250px;
		margin: auto;
		margin-top: 2rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
