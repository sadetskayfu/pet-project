export const getLastSelectedValue = (value: any) => {
    if(Array.isArray(value)) {
        return value[value.length - 1]
    } else {
        return value
    }
}