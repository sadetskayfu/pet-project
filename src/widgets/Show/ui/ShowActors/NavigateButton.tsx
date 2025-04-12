import { useSwiper } from "swiper/react"
import { IconButton } from "@/shared/ui/IconButton"
import { LongArrow } from "@/shared/assets/icons"
import {
	AdditionalClasses,
	classNames,
	Mods,
} from "@/shared/helpers/classNames"
import { useEffect, useState } from "react"
import styles from "./style.module.scss"

type NavigateButtonDirection = "prev" | "next"

export const NavigateButton = ({
	direction,
}: {
	direction: NavigateButtonDirection
}) => {
	const swiper = useSwiper()
	const isNext = direction === "next"

	const [isBeginning, setIsBeginning] = useState(swiper.isBeginning)
	const [isEnd, setIsEnd] = useState(swiper.isEnd)

	useEffect(() => {
		const handleSlideChange = () => {
			setIsBeginning(swiper.isBeginning)
			setIsEnd(swiper.isEnd)
		}

		swiper.on("slideChange", handleSlideChange)

		return () => {
			swiper.off("slideChange", handleSlideChange)
		}
	}, [swiper])

	const mods: Mods = {
		[styles["visible"]]: (isNext && !isEnd) || (!isNext && !isBeginning),
	}

	const additionalClasses: AdditionalClasses = [styles[direction]]

	return (
		<IconButton
			size="m"
			className={classNames(styles["navigate-button"], additionalClasses, mods)}
			onClick={() => (isNext ? swiper.slideNext() : swiper.slidePrev())}
		>
			<LongArrow direction={isNext ? "right" : "left"} />
		</IconButton>
	)
}
