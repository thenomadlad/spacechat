<script lang="ts">
  import { slide } from 'svelte/transition';
  import { username } from '$lib/db_and_user';
  import HeaderLink from './HeaderLink.svelte';
  import HeaderProfile from './HeaderProfile.svelte';
  import HeaderSignout from './HeaderSignout.svelte';

  let menuOpen: boolean = false;

  function toggleMenu() { menuOpen = !menuOpen; }

</script>

<nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-3xl">🌌</h1>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <HeaderLink is_mobile="false" href="/">Chat</HeaderLink>
              <HeaderLink is_mobile="false" href="/how_it_works">How it works</HeaderLink>
            </div>
          </div>
        </div>
        {#if $username}
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile -->
            <HeaderProfile username={$username} />
            <HeaderSignout />
          </div>
        </div>
        {/if}

        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" on:click={toggleMenu}>
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {#if menuOpen}
    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden" id="mobile-menu" transition:slide>
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <HeaderLink is_mobile="true" href="/">Chat</HeaderLink>
        <HeaderLink is_mobile="true" href="/how_it_works">How it works</HeaderLink>
      </div>
      {#if $username}
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <HeaderProfile username={$username} />
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">{$username}</div>
          </div>
          <div class="ml-auto">
            <HeaderSignout />
          </div>
        </div>
      </div>
      {/if}
    </div>
    {/if}
  </nav>