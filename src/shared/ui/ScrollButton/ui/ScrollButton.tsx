import { LongArrow } from "@/shared/assets/icons"
import { memo, useCallback, useEffect, useState } from "react"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { classNames, Mods } from "@/shared/helpers/classNames"
import throttle from "lodash/throttle"
import styles from "./style.module.scss"

interface ScrollButtonProps {
	focusRef?: React.RefObject<HTMLElement | null>
	label: string
	visibleRange?: number
}

export const ScrollButton = memo((props: ScrollButtonProps) => {
	const {
		focusRef,
		label,
		visibleRange = 500,
	} = props

	const [isVisible, setIsVisible] = useState<boolean>(false)

	const handleScroll = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" })
		focusRef?.current?.focus()
	}, [focusRef])

	useEffect(() => {
		const setVisible = throttle(() => {
			console.log("sd")
			setIsVisible(window.scrollY > visibleRange)
		}, 200)

		window.addEventListener("scroll", setVisible)

		return () => {
			window.removeEventListener("scroll", setVisible)
            setVisible.cancel()
		}
	}, [visibleRange])

	const mods: Mods = {
		[styles["visible"]]: isVisible,
	}

	return (
		<BaseTooltip placement="top" label={label}>
			<button
				onClick={handleScroll}
				aria-label={label}
				tabIndex={isVisible ? 0 : -1}
				className={classNames(styles["scroll-button"], [], mods)}
			>
				<LongArrow direction="top" />
			</button>
		</BaseTooltip>
	)
})
