<script lang="ts">
    import { logOut } from "$lib/firebase";
    import { stateStore } from "$lib/stores/stateStore";

    function switchTheme(){
        $stateStore.theme = $stateStore.theme == "light" ? "dark" : "light"
    }
</script>

<button on:click={switchTheme}><span class="material-symbols-outlined">{$stateStore.theme == "light" ? "dark_mode" : "light_mode"}</span></button>
<button on:click={logOut}>Logout</button>

<style lang="scss">
    button{
        text-decoration: underline;
        margin-right: .5rem;
        cursor: pointer;
    }
</style>