<script lang="ts">
    import { stateStore } from "$lib/stores/stateStore";
    import CalendarPage from "./CalendarPage.svelte";
    import PeoplePage from "./PeoplePage.svelte";
    import SettingsPage from "./SettingsPage.svelte";
    import TagsPage from "./TagsPage.svelte";
    import TodayPage from "./TodayPage.svelte";
</script>

{#if $stateStore['selectedPage'] == 'Today'}
<TodayPage/>
{:else if $stateStore['selectedPage'] == "Calendar"}
<CalendarPage/>
{:else if $stateStore['selectedPage'] == "Tags"}
<TagsPage/>
{:else if $stateStore['selectedPage'] == "People"}
<PeoplePage/>
{:else if $stateStore['selectedPage'] == "Settings"}
<SettingsPage/>
{/if}

<style lang="scss">
    
</style>