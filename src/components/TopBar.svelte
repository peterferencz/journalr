<script lang="ts">
    import { logOut } from "$lib/firebase";
    import { userStore } from "$lib/stores/userStore";
</script>


<p>{$userStore?.email}</p>
<button on:click={logOut}>Logout</button>

<style lang="ts">

</style>