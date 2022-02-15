<script lang="ts">
    import { username } from '$lib/db_and_user'
    import { fade, slide } from 'svelte/transition'

    export let who: string;
    export let what: string;
    export let when: Date;

    let isFocused = false;
    let whenString = isDatePartSame(when, new Date()) ? getTimePart(when) : getDateAndTimePart(when);

    const isMessageFromUser = $username === who;

    function setfocus() { isFocused = true; }
    function setblur() { isFocused = false; }
    function toggleFocus() { isFocused = !isFocused; }

    function isDatePartSame(date1: Date, date2: Date) : boolean {
        return date1.getUTCDate() == date2.getUTCDate() && date1.getUTCMonth() == date2.getUTCMonth() && date1.getUTCFullYear() == date2.getUTCFullYear()
    }

    function getTimePart(when: Date): string {
        return when.toLocaleTimeString("default", { hour: "numeric", minute: "numeric"})
    }

    function getDateAndTimePart(when: Date): string {
        if (when.getFullYear() === (new Date()).getFullYear()) {
            return when.toLocaleString('default', { day: "numeric", month: 'short',  hour: "numeric", minute: "numeric" });
        } else {
            return when.toLocaleString('default', { dateStyle: "short", timeStyle: "short" });
        }
    }
</script>

<div class="{isMessageFromUser ? "place-self-end" : "place-self-start"} space-y-1">
    <div tabindex="0" on:focus={setfocus} on:blur={setblur} class="p-3 rounded-xl {isMessageFromUser ? "bg-indigo-200 rounded-tr-none" : "bg-teal-200 rounded-tl-none"}">
        <p>{what}</p>
    </div>
    {#if isFocused}
    <div transition:slide>
        <p transition:fade class="{isMessageFromUser ? "text-indigo-400 text-right" : "text-teal-400 text-left"}">{whenString}</p>
    </div>
    {/if}
</div>