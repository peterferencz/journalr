<script lang="ts">
    import { stateStore, type Page } from "$lib/stores/stateStore";

    const pages:{name:Page, icon:string}[] = [
        {
        name: "Today",
        icon: "stylus_note"
        },
        {
        name: "Calendar",
        icon: "calendar_month"
        },
        // {
        // name: "Tags",
        // icon: "tag"
        // },
        // {
        // name: "People",
        // icon: "groups"
        // },
        // {
        // name: "Settings",
        // icon: "settings"
        // },
    ]
</script>

{#each pages as page}
    <button 
        on:click={() => $stateStore.selectedPage = page.name}
        class:active={$stateStore.selectedPage == page.name}
        title={page.name}>
        <span class="material-symbols-outlined">{page.icon}</span></button>
{/each}

<style lang="scss">
button{
    color: var(--text-disabled);
    cursor: pointer;

    &.active{
        color: var(--text);
    }
}
</style>