<script lang="ts">
    import CalendarHistogram from "../misc/CalendarHistogram.svelte";

    const now = new Date(Date.now())

</script>

<CalendarHistogram year={now.getFullYear()} month={now.getMonth()+1} />

<style lang="scss">

</style>