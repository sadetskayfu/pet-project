import { useWindowWidth } from "@/shared/hooks"
import { useEffect, useState } from "react"

const getYearColumns = (width: number) => {
    if(width > 900) {
        return 4
    }
    if(width > 768) {
        return 3
    }

    if(width > 550) {
        return 3
    }

    if(width > 420) {
        return 5
    }

    return 4
}

export const useYearColumns = () => {
    const [yearColumns, setYearColumns] = useState<number>(4)

    const { windowWidth } = useWindowWidth()

    useEffect(() => {
        setYearColumns(getYearColumns(windowWidth))
    }, [windowWidth])

    return { yearColumns }
}