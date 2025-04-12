import { LongArrow } from "@/shared/assets/icons"
import { memo, useCallback, useEffect, useState } from "react"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { classNames, Mods } from "@/shared/helpers/classNames"
import throttle from "lodash/throttle"
import styles from "./style.module.scss"

interface ScrollButtonProps {
	targetRef?: React.RefObject<HTMLElement>
	targetFocusRef?: React.RefObject<HTMLElement>
	label: string
	offset?: number
	visibleRange?: number
}

export const ScrollButton = memo((props: ScrollButtonProps) => {
	const {
		targetRef,
		targetFocusRef,
		label,
		offset = 0,
		visibleRange = 500,
	} = props

	const [isVisible, setIsVisible] = useState<boolean>(false)

	const handleScroll = useCallback(() => {
		if (targetRef?.current) {
			const top =
				targetRef.current.getBoundingClientRect().top + window.scrollY - offset
			window.scrollTo({ top, behavior: "smooth" })
			targetFocusRef?.current.focus()
            setIsVisible(false)
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" })
			targetFocusRef?.current.focus()
            setIsVisible(false)
		}
	}, [targetRef, targetFocusRef, offset])

	useEffect(() => {
		// const setVisible = () => throttle(() => {
		//     console.log('sd')
		//     if(targetRef?.current) {
		//         const targetTopPosition = targetRef.current.getBoundingClientRect().top
		//         setIsVisible(window.scrollY - targetTopPosition > visibleRange)
		//     } else {

		//         setIsVisible(window.scrollY > visibleRange)
		//     }
		// }, 50)

		const setVisible = throttle(() => {
			console.log("sd")
			setIsVisible(window.scrollY > visibleRange)
		}, 200)

		window.addEventListener("scroll", setVisible)

		return () => {
			window.removeEventListener("scroll", setVisible)
            setVisible.cancel()
		}
	}, [visibleRange, targetRef])

	const mods: Mods = {
		[styles["visible"]]: isVisible,
	}

	return (
		<BaseTooltip placement="left" label={label}>
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
