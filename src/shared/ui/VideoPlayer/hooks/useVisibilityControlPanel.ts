import { useCallback, useRef, useState } from "react"

export const useVisibilityControlPanel = () => {
    const [isVisibleControlPanel, setIsVisibleControlPanel] = useState<boolean>(false)

    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

    const setVisibleControlPanel = useCallback(() => {
        if(timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current)
        }

        timeoutIdRef.current = setTimeout(() => setIsVisibleControlPanel(false), 3000)

        setIsVisibleControlPanel(true)
    }, [])

    return { setVisibleControlPanel, isVisibleControlPanel }
}