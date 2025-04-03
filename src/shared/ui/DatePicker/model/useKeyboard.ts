import { useCallback } from "react"

type UseKeyboardProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useKeyboard = (props: UseKeyboardProps) => {
    const { setOpen } = props

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        switch(event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                setOpen(true)
            break;
            case 'Enter':
            case ' ':
                setOpen((prev) => !prev)
                break;
        }
    }, [setOpen])

    return { handleKeyDown }
}