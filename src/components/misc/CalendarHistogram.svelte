<script lang="ts">
    import { stateStore } from "$lib/stores/stateStore";

    //TODO abstract these to settings
    const startOfWeek = 1
    const lettersToShow = 3;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    export let year:number = new Date(Date.now()).getFullYear()
    export let month:number = new Date(Date.now()).getMonth() + 1


    $: daysInMonth = new Date(year, month, 0).getDate()
    $: startOfMonth = new Date(year, month-1, 1).getDay()
    $: blankDays = startOfMonth + (startOfWeek > startOfMonth ? 7 : 0) - startOfWeek

    function seelctDayCallback(year:number, month:number, day:number) {
        $stateStore.selectedDay = {year: year, month: month, day: day}
        $stateStore.selectedPage = "Today"
    }

    function incrementMonth(){
        if(month < 12){
            month += 1
            return
        }

        month = 1
        year += 1
    }

    function decrementMonth(){
        if(month > 1){
            month -= 1
            return
        }

        month = 12
        year -= 1
    }
</script>

<div class="controls">
    <button on:click={decrementMonth}> &lt; </button>
    <p>{year}/{month}</p>
    <button on:click={incrementMonth}> &gt; </button>
</div>
<div class="container">
    {#each days as _, i}
        <p class="day">{(days[(i + startOfWeek) % days.length]).substring(0, lettersToShow) }</p>
    {/each}
    
    {#each Array(blankDays) as i}
        <p class="blank"></p>
    {/each}

    {#each Array(daysInMonth) as _, i}
        <p on:click={() => seelctDayCallback(year, month, i+1)}
            class:active={year == $stateStore.selectedDay.year && month == $stateStore.selectedDay.month && i+1 == $stateStore.selectedDay.day}
            >{i+1}</p>
    {/each}
</div>


<style lang="scss">
.controls{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button{
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
.container{
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(7, 1fr);

    align-items: center;
    justify-content: center;

    p{
        &.day{
            text-align: right;
        }
        &:not(.day){
            cursor: pointer;
        }

        &.active{
            background: var(--accent);
        }

        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
    }
}
</style>