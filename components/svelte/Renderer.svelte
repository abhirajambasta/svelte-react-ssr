<script>
  import { onDestroy, onMount } from "svelte";

  import { serverRender, destroy, clientRender } from "../renderer.js";

  let target;
  let reactNode;

  onDestroy(() => destroy(target));
  $: {
    try {
      reactNode = serverRender();
      console.log({ reactNode });
    } catch (error) {
      console.log("error", error);
    }
  }

  onMount(() => {
    try {
      clientRender(target);
    } catch (error) {
      console.log("error on mount", error);
    }
  });
</script>

<div class="root">
  <div bind:this={target}>{@html reactNode}</div>
</div>
