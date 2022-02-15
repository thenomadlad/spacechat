<script lang="ts">
  export let username;
</script>

<div class="ml-3 relative">
  <div>
    <img
      class="h-10 w-10 rounded-full"
      src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
      alt="User profile"
    />
  </div>
</div>
