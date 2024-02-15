import type { Entry } from "$lib/firebase";
import { writable } from "svelte/store";

const create = () => {
    const {subscribe, set, update} = writable<Entry[]>([])

    return {
        subscribe,
        set,
        update,
        add: (el:Entry) => update(values => [...values, el])
    }
}

export const dayStore = create()