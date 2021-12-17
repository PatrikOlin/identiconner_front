<script>
	import { onMount } from "svelte";
	import { getIdenticon } from "./shared/api";

	let id = "";
	let base64image = "";
	const urlParams = new URLSearchParams(window.location.search);
	let debounce;

	onMount(async () => {
		id = urlParams.get("id");
		if (id) {
			fetchIdenticon(id);
		}
	});

	const onInput = (val) => {
		if (val.trim() === id) {
			return;
		}
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			id = val;
			fetchIdenticon(id);
		}, 200);
	};

	const fetchIdenticon = async (id) => {
		const blob = await getIdenticon(id);
		base64image = `data:image/png;base64,${blob}`;
		updateUrl(id);
	};

	const updateUrl = (id) => {
		let encodedId = encodeURIComponent(id);
		let stateObj = { id: "666" };
		window.history.replaceState(stateObj, id, `?id=${encodedId}`);
	};
</script>

<main>
	<h1>Identicon.app</h1>
	<p>Enter a name below to generate a <br /> brand spanking new identicon!</p>
	<input
		placeholder="Name to identiconify"
		value={id}
		on:input={(e) => onInput(e.target.value)}
	/>
	{#if base64image}
		<img src={base64image} alt="identicon" />
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

	p {
		font-size: 1.2em;
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
