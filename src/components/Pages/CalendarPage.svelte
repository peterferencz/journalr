<script lang="ts">
    import { getDateString, getNameOfTheMonthLocale } from "$lib/misc";
    import CalendarHistogram from "../misc/CalendarHistogram.svelte";

    const now = new Date(Date.now())

</script>

<div id="heatmap_container">
<CalendarHistogram year={now.getFullYear()} month={now.getMonth()+1} />

</div>

<style lang="scss">
.container{
    display: grid;
    height: 10rem;
    grid-template-rows: repeat(7, 1fr);
    
    width: 100%;

    .day{
        width: 1rem;
        height: 1rem;
        padding: 1rem;
        border-radius: .5rem;
        background-color: tomato;
        line-height: 1rem;
        text-align: center;
    }
}
</style>