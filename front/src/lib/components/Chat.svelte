<script lang="ts">
  import Login from './Login.svelte';
  import ChatMessage from './ChatMessage.svelte';
  import { username } from '$lib/auth';

  // Key for end-to-end-encryption
  class ChatMessageContainer {
    constructor(public who: string, public what: string, public when: Date) {}
  }

  let newMessage: string;
  let messages: ChatMessageContainer[] = [];

  async function sendMessage() {
    messages = [
      ...messages.slice(-100),
      new ChatMessageContainer(username + '', newMessage, new Date())
    ];

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
    <input
      class="w-full p-2"
      type="text"
      placeholder="Type a message..."
      bind:value={newMessage}
      maxlength="250"
    />
    <button
      class="w-20 justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      type="submit"
      disabled={!newMessage}>🚀</button
    >
  </form>
{:else}
  <main>
    <Login />
  </main>
{/if}
