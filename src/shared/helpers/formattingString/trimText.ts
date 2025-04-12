export const trimText = (str: string, length: number) => {
    if(str.length > length) {
        return str.slice(0, length - 2) + '..'
    } else {
        return str
    }
}