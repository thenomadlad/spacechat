<script lang="ts">
    import { page } from '$app/stores';

    export let href: string = "";
    export let is_mobile: string;

    $: active = $page.path === href;
</script>

{#if is_mobile == "true"}
<a {href} class={(active ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white" ) + " block px-3 py-2 rounded-md text-base font-medium"}><slot></slot></a>
{:else}
<a {href} class={(active ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white") + " px-3 py-2 rounded-md text-sm font-medium"} aria-current="page"><slot></slot></a>
{/if}