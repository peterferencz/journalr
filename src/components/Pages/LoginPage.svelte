<script lang="ts">
    import { loginWithCredentials } from "$lib/firebase";
    import { redirect } from "@sveltejs/kit";

    let username = ""
    let password = ""
    let error = ""

    let state:"idle"|"waiting"

    const login = () => {
        error = ""
        loginWithCredentials(username, password).then(user => {
            state = "idle"
        }).catch(err => {
            error = `${err.code}: ${err.message}`
            state = "idle"
        })
    }
</script>

<div class="container">
    <div>
        <h1>Login</h1>
        <input placeholder="Username" bind:value={username} type="text">
        <input placeholder="Password" bind:value={password} type="password">
        {#if error != ""}
            <div>
                <p>{error}</p>
            </div>
        {/if}
        <button on:click={login} class:disabled={state == "waiting"} disabled={state == "waiting"}>login</button>
    </div>
</div>

<style lang="scss">

.container{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    >div{
        display: flex;
        flex-direction: column;
        gap: .5rem;

        button{
            text-decoration: underline;
            cursor: pointer;
        }
    }
}

.disabled{
    color: yellow;
}
</style>