<script lang="ts">
    import Header from '$lib/components/header/Header.svelte';
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

<div class="min-h-full flex flex-col h-screen">
    <Header />
    <slot></slot>
</div>