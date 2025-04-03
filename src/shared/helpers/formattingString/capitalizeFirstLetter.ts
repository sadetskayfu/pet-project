import { getFirstLetter } from "./getFirstLetter"

export const capitalizeFirstLetter = (str: string) => {
    const firstLetter = getFirstLetter(str).toUpperCase()
    
    return firstLetter + str.slice(1)
}