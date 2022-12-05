<script>
	import {onMount} from 'svelte';
	import Renderer from './Renderer.svelte';
	export let value;
	export let dateString;

	onMount(() => {
		setInterval(() => {
			dateString = (new Date()).toString() + ' Client-side rendered!';
		}, 1000);
	});
</script>

<Renderer/>

<p>{value}</p>

<p>{dateString}</p>
