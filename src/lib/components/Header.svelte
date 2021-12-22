<script lang="ts">
    import { username, user } from '$lib/db_and_user';

    function signout() {
        user.leave();
        username.set('');
    }
</script>

<header>
    <h1>🌌</h1>
    {#if $username}
        <div class="user-bio">
            <span>Hello <strong>{$username}</strong></span>
            <img src={`https://avatars.dicebear.com/api/initials/${$username}.svg`} alt="User avatar" />
        </div>

        <button class="signout-button" on:click={signout}>
            Sign out
        </button>
    {:else}
        <h3>Space chat</h3>
    {/if}
</header>