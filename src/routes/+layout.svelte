<script lang="ts">
    import { userStore } from "$lib/stores/userStore";
    import NavBar from "../components/NavBar.svelte";
    import PageSelector from "../components/Pages/PageSelector.svelte";
    import TopBar from "../components/TopBar.svelte";
    import LoginPage from "../components/Pages/LoginPage.svelte";
    import LoadingPage from "../components/Pages/LoadingPage.svelte";
    import { stateStore } from "$lib/stores/stateStore";

    import "../base.scss"
</script>

<svelte:head>
    <meta name="color-scheme" content="light dark"/>
    {#if $stateStore.theme == "light"}
        <link rel="stylesheet" href="/theme/light.css">
    {:else}
        <link rel="stylesheet" href="/theme/dark.css">
    {/if}
</svelte:head>

<!-- <Theme/> -->

<!-- TODO use loading page instad of login page -->
{#if false}
    <LoadingPage/>
{:else if $userStore == null}
    <LoginPage/>
{:else}
    <section class="top">
        <TopBar/>
    </section>
    <section class="nav">
        <NavBar/>
    </section>
    <section class="slot">
        <PageSelector/>
    </section>
{/if}



<style lang="scss">
$navbar-width: 3rem;
$topbar-height: 2rem;

section{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.top{
        left: 0;
        right: 0;
        top: 0;
        height: $topbar-height;
    
        flex-direction: row;
        justify-content: end;
    }
    &.nav{
        left: 0;
        top: $topbar-height;
        bottom: 0;
        width: $navbar-width;
        padding-left: .5rem;
    
        flex-direction: column;
        gap: 1rem;
    }
    &.slot{
        left: $navbar-width;
        top: $topbar-height;
        right: 0;
        bottom: 0;

        flex-direction: column;
    }
}
</style>