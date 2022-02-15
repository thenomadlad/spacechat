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
            .map()
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

{#if $username}
    <main class="flex flex-col-reverse h-full justify-between overflow-y-auto">
        <ul class="space-y-5 p-5 grid grid-cols-1">
            {#each messages as message (message.when)}
                <ChatMessage {...message} />
            {/each}
        </ul>
    </main>

    <form class="h-20 flex flex-row ring-2" on:submit|preventDefault={sendMessage}>
        <input class="w-full p-2" type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="250" />
        <button class="w-20 justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" type="submit" disabled={!newMessage}>🚀</button>
    </form>
{:else}
    <main>
        <Login />
    </main>
{/if}