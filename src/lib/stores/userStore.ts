import type { User } from "firebase/auth";
import { writable } from "svelte/store";

const create = () => {
    const {subscribe, set, update} = writable<null|User|undefined>(undefined)

    return {
        subscribe,
        set,
        update
    }
}

export const userStore = create()