import type { DateObject } from "./stores/stateStore"

export const getDateString = (year:number, month:number, day:number) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const getDateStringFromDateObject = (date:DateObject) => getDateString(date.year, date.month, date.day)

export const getNameOfTheMonthLocale = (year:number, month:number) => {
    return new Date(year, month).toLocaleString('default', {month: 'long'})
}