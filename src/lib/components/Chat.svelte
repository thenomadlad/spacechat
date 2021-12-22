<script lang="ts">
    import Login from './Login.svelte';
    import ChatMessage from './ChatMessage.svelte';
    import { username, db, user } from '$lib/db_and_user';
    import { onMount } from 'svelte';
    import { SEA } from 'gun';
    import 'gun/lib/then';

    // Key for end-to-end-encryption
    const key = '#super-secret';
    class ChatMessageContainer {
        constructor(
            public who: string,
            public what: string,
            public when: Date,
        ) {}
    }


    let newMessage: string;
    let messages: ChatMessageContainer[] = [];

    onMount(() => {
        // Load up our messages
        db.get('chat')
            .map({
                // @ts-ignore
                // lexical queries are kind of like a limited RegEx or Glob.
                '.': {
                    // property selector
                    '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
                },
                '-': 1, // filter in reverse
            })
            .once(async (data, id) => {
                if (data) {
                    const message = new ChatMessageContainer(
                        (await SEA.decrypt(data.who, key)) + '',
                        (await SEA.decrypt(data.what, key)) + '',
                        new Date((await SEA.decrypt(data.when, key)) + '')
                    );

                    if (message.what) {
                        messages = [...messages.slice(-99), message];
                    }
                }
            });
    });

    async function sendMessage() {
        let index = new Date().toISOString();

        db.get('chat').get(index).put({
            who: await SEA.encrypt(await user.get('alias'), key),
            what: await SEA.encrypt(newMessage, key),
            when: await SEA.encrypt(index, key),
        });

        // reset our store
        newMessage = '';
    }

</script>

<div class="container">
    {#if $username}
        <main>
            {#each messages as message (message.when)}
                <ChatMessage {...message} />
            {/each}
        </main>

        <form on:submit|preventDefault={sendMessage}>
            <input type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="250" />
            <button type="submit" disabled={!newMessage}>🚀</button>
        </form>
    {:else}
        <main>
            <Login />
        </main>
    {/if}
</div>