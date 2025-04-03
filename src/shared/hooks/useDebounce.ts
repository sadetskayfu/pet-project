import { useCallback, useEffect, useRef } from "react"

export const useDebounce = <T extends (...args: any[]) => any>(fn: T, delay: number = 200) => {
    const delayTimeoutId = useRef<NodeJS.Timeout | null>(null)

    const debounceFn = useCallback((...args: Parameters<T>) => {
        if(delayTimeoutId.current) {
            clearTimeout(delayTimeoutId.current)
        }

        delayTimeoutId.current = setTimeout(() => {
            fn(...args)
        }, delay)
    }, [fn, delay])

    useEffect(() => {
        return () => {
            if(delayTimeoutId.current) {
                clearTimeout(delayTimeoutId.current)
            }
        }
    }, [])

    return debounceFn
}