import { classNames, Mods } from "@/shared/helpers/classNames"
import { memo } from "react"
import styles from './style.module.scss'

interface DisplayStarProps {
    fullFilled: boolean
	threeQuartersFilled: boolean
	halfFilled: boolean
	quarterFilled: boolean
}

export const DisplayStar = memo((props: DisplayStarProps) => {
    const { fullFilled, threeQuartersFilled, halfFilled, quarterFilled } = props

	const mods: Mods = {
		[styles['full-filled']]: fullFilled,
		[styles['three-quarters-filled']]: threeQuartersFilled,
		[styles['half-filled']]: halfFilled,
		[styles['quarter-filled']]: quarterFilled,
	}

    return (
        <span className={classNames(styles['star'], [], mods)}>

        </span>
    )
})