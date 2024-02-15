<script lang="ts">
    import { getNameOfTheMonthLocale } from "$lib/misc";
    import { stateStore } from "$lib/stores/stateStore";

    //TODO abstract these to settings
    const startOfWeek = 1
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    export let year:number = new Date(Date.now()).getFullYear()
    export let month:number = new Date(Date.now()).getMonth() + 1


    $: daysInMonth = new Date(year, month, 0).getDate()
    $: startOfMonth = new Date(year, month-1, 1).getDay()
    $: blankDays = startOfMonth + (startOfWeek > startOfMonth ? 7 : 0) - startOfWeek

    function getArr(){
        for(let i = 0; i < daysInMonth; i++){

        }
    }

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
<button on:click={decrementMonth}>&lt;</button>
<p>{year}/{month}</p>
<button on:click={incrementMonth}>&gt;</button>
<div>
    {#each days as _, i}
        <p class="day">{days[(i + startOfWeek) % days.length]}</p>
    {/each}
    
    {#each Array(blankDays) as i}
        <p class="blank">.</p>
    {/each}

    {#each Array(daysInMonth) as _, i}
        <p on:click={() => seelctDayCallback(year, month, i+1)}
            class={year == $stateStore.selectedDay.year && month == $stateStore.selectedDay.month && i+1 == $stateStore.selectedDay.day ? "active" : ""}
            >{i+1}</p>
    {/each}
</div>

<style lang="scss">
div{
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(7, 1fr);

    align-items: center;
    justify-content: center;

    p{
        &.day{
            width: 7rem;
        }
        &:not(.day){
            cursor: pointer;
        }

        &.active{
            background-color: tomato;
        }

        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
    }
}
</style>