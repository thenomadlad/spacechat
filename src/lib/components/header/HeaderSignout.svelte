<script lang="ts">
    import {user, username} from "$lib/db_and_user";

    function signout() {
        user.leave();
        username.set('');
    }
</script>

<button class="text-gray-300 hover:bg-red-700 hover:text-white block ml-3 px-3 py-2 rounded-md text-base font-medium" on:click={signout}>
    Sign out
</button>