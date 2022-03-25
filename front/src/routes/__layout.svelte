<script lang="ts">
  import Header from '$lib/components/header/Header.svelte';
</script>

<div class="min-h-full flex flex-col h-screen">
  <Header />
  <slot />
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
