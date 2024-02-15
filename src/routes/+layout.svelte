<script lang="ts">
    import { userStore } from "$lib/stores/userStore";
    import NavBar from "../components/NavBar.svelte";
    import PageSelector from "../components/Pages/PageSelector.svelte";
    import TopBar from "../components/TopBar.svelte";
    import LoginPage from "../components/Pages/LoginPage.svelte";
    import LoadingPage from "../components/Pages/LoadingPage.svelte";
</script>

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

:global(*){
    margin: 0px;
    padding: 0px;
}

section{
    position: absolute;
}
.top{
    left: 0;
    right: 0;
    top: 0;
    height: $topbar-height;

    display: flex;
    flex-direction: row;
}
.nav{
    left: 0;
    top: $topbar-height;
    bottom: 0;
    width: $navbar-width;

    display: flex;
    flex-direction: column;
}
.slot{
    left: $navbar-width;
    top: $topbar-height;
    right: 0;
    bottom: 0;
}
</style>