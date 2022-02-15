<script lang="ts">
  import { username } from '$lib/auth';

  function signout() {
    username.set('');
  }
</script>

<button
  class="text-gray-300 hover:bg-red-700 hover:text-white block ml-3 px-3 py-2 rounded-md text-base font-medium"
  on:click={signout}
>
  Sign out
</button>
