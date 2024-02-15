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

<h1>Login</h1>
<p>Username</p>
<input bind:value={username} type="text">
<p>Password</p>
<input bind:value={password} type="text">
{#if error != ""}
    <div>
        <p>{error}</p>
    </div>
{/if}
<button on:click={login} class="{state == "waiting" ? "disabled" : ""}" disabled={state == "waiting"}>login</button>

<style lang="scss">

.disabled{
    color: yellow;
}
</style>