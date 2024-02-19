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
            //TODO DELETE
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

    function autoAdjustTextareaHeight(textArea:EventTarget | null){
        const t = textArea as HTMLTextAreaElement;
        t.style.height = "auto"
        t.style.height = t.scrollHeight + "px"

        //TODO update on initialization
    }

    
    //TODO We need to implement real time listening with onSnapshot
    //TODO input validation
</script>

<div class="top">
    <h1>{`${$stateStore.selectedDay.year}/${$stateStore.selectedDay.month}/${$stateStore.selectedDay.day}`}</h1>
    <!-- TODO await while loading -->
    <div class="sort" bind:this={container}>
        {#each $dayStore as value, i}
        <div class="entry" data-id={value.id}>
            <div>
                <div class="sort-handle"><span class="material-symbols-outlined">drag_indicator</span></div>
                <input class="title" type="text" bind:value={value.summary} on:change={() => onChange(value)} disabled={state == "waiting"}>
            </div>
            <textarea class="description" placeholder="Describe in detail..."
                bind:value={value.story}
                on:input={(e) => autoAdjustTextareaHeight(e.target)}
                on:change={() => onChange(value)}
                disabled={state == "waiting"}
            />
        </div>
        {/each}
    </div>
    <input type="text" bind:value={temporaryEntry} on:keydown={e => {if(e.key == "Enter"){addNew()}}} disabled={state == "waiting"} placeholder="New entry..."/>
</div>

<style lang="scss">
.top{
    display: flex;
    flex-direction: column;
    width: 70%;
    max-width: 70rem;
    
    h1{
        font-size: 2rem;
    }

    div.sort-handle{
        cursor: grab;
    }

    .entry{
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        align-items: stretch;

        >div{
            display: flex;
            flex-direction: row;

            >*{
                line-height: 1rem;
            }
        }

        input{
            padding-left: .5rem;
            font-size: 1rem;
        }

        textarea{
            padding-top: .5rem;
            resize: vertical;
        }
    }
}
</style>