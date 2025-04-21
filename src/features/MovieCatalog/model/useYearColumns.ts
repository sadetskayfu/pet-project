import { useWindowWidth } from "@/app/providers/windowWidth"
import { useEffect, useState } from "react"

const getYearColumns = (width: number) => {
    if(width > 1050) {
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

    if(width > 360) {
        return 4
    }

    if(width > 0) {
        return 3
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