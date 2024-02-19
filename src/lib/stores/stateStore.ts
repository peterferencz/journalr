import { writable } from "svelte/store";

export type Page = "Calendar"|"People"|"Settings"|"Tags"|"Today"
export type ApplicationState = {
    selectedPage:Page
    selectedDay: DateObject,
    theme: "light"|"dark"
}

export type DateObject = {
    year:number,
    month:number,
    day:number
}

const create = () => {
    const now = new Date(Date.now())
    
    const {subscribe, set, update} = writable<ApplicationState>({
        selectedPage: "Today",
        selectedDay: {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
        },
        theme: "dark"
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const stateStore = create()