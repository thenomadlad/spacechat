<script lang="ts">
    import { user } from '$lib/db_and_user';

    let username: string;
    let password: string;

    function login() {
        user.auth(username, password, (data) => data['err'] && alert(data['err']));
    }

    function signup() {
        user.create(username, password, (data) => {
            if (data['err']) {
                alert(data['err']);
            } else {
                login();
            }
        });
    }

</script>

<label for="username">Username</label>
<input name="username" bind:value={username} minlength="3" maxlength="16" />

<label for="password">Password</label>
<input name="password" bind:value={password} type="password" />

<button class="login" on:click={login}>Login</button>
<button class="login" on:click={signup}>Sign up</button>
