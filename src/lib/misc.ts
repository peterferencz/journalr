import type { DateObject } from "./stores/stateStore"

export const getDateString = (year:number, month:number, day:number) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const getDateStringFromDateObject = (obj:DateObject) => getDateString(obj.year, obj.month, obj.day)