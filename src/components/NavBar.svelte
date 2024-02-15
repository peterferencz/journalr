<script lang="ts">
    import { stateStore } from "$lib/stores/stateStore";
</script>

<button on:click={() => $stateStore['selectedPage'] = "Today"}>Today</button>
<button on:click={() => $stateStore['selectedPage'] = "Calendar"}>Calendar</button>
<button on:click={() => $stateStore['selectedPage'] = "Tags"}>Tags</button>
<button on:click={() => $stateStore['selectedPage'] = "People"}>Ppl</button>
<button on:click={() => $stateStore['selectedPage'] = "Settings"}>Settings</button>

<style lang="scss">
    
</style>