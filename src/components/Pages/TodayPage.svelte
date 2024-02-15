<script lang="ts">
    import { addNewEntry, getDay, type Entry, setEntry, updateOrders } from "$lib/firebase";
    import { dayStore } from "$lib/stores/dayStore";
    import { onMount } from "svelte";
    import Sortable from "sortablejs";
    import { stateStore } from "$lib/stores/stateStore";

    let container:HTMLDivElement
    let state:"waiting"|"idle" = "waiting"
    let temporaryEntry = ""

    const addNew = async () => {
        state = "waiting"
        dayStore.add(
            await addNewEntry(
                $stateStore.selectedDay,
                {id:"##ShouldBeReplaced##", summary:temporaryEntry, story: "", order: $dayStore.length+1}
                )
        )
        temporaryEntry = ""
        state = "idle"
    }

    const onChange = async (entry:Entry) => {
        state = "waiting"
        if(entry.story == "" && entry.summary == ""){
            //DELETE TODO
            state = "idle"
            return
        }

        //UPDATE
        await setEntry($stateStore.selectedDay, entry)
        state = "idle"
    }

    let sortable:Sortable

    $: if(state) {
        if(sortable != null){
            sortable.options.disabled = (state == "waiting")
        }
    }

    onMount(async () => {
        dayStore.set(await getDay($stateStore.selectedDay))

        sortable = new Sortable(container, {
            sort: true,
            disabled: false,
            animation: 150,
            handle: ".sort-handle",
            onEnd: async (e) => {
                state = "waiting"
                const oldIndex = e.oldIndex || 0
                const newIndex = e.newIndex || 0
                const sorted = sortable.toArray()
                
                //TODO optimize, as to not update all elements
                for(let i = 0; i < $dayStore.length; i++){
                    $dayStore[i].order = sorted.indexOf($dayStore[i].id) + 1
                }
                await updateOrders($stateStore.selectedDay, $dayStore)
                
                state = "idle"
            }
        })

        state = "idle"
    })

    
    //TODO We need to implement real time listening with onSnapshot
    //TODO input validation
</script>

<div>
    <p>{`${$stateStore.selectedDay.year}/${$stateStore.selectedDay.month}/${$stateStore.selectedDay.day}`}</p>
    <!-- {#await } -->
        <!-- <p>Loading...</p> -->
    <!-- {:then data} -->
    <div class="sort" bind:this={container}>
        {#each $dayStore as value, i}
        <div data-id={value.id}>
            <div class="sort-handle">[--]</div>
            <input type="text" bind:value={value.summary} on:change={() => onChange(value)} disabled={state == "waiting"}>
            <input type="text" bind:value={value.story} on:change={() => onChange(value)} disabled={state == "waiting"}>
        </div>
        {/each}
    </div>
    <!-- {/await} -->
    <input type="text" bind:value={temporaryEntry} on:keydown={e => {if(e.key == "Enter"){addNew()}}} disabled={state == "waiting"} placeholder="New entry..."/>
</div>

<style lang="scss">
    div{
        display: flex;
        flex-direction: column;

        div div{
            flex-direction: row;
        }
    }
</style>