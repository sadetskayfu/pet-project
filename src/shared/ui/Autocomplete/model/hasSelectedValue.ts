export const hasSelectedValue = <T>(value: T[] | T | null | string) => {
    const isArray = Array.isArray(value)

    if(isArray && value.length > 0) return true
    if(!isArray && value) return true
    
    return false
}