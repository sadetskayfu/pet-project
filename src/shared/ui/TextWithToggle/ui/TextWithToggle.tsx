import { memo, useCallback, useEffect, useRef, useState } from "react"
import {
	AdditionalClasses,
	classNames,
	Mods,
} from "@/shared/helpers/classNames"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { CompositeItem } from "@floating-ui/react"
import styles from "./style.module.scss"

interface TextWithToggleProps {
	className?: string
	children: string
	maxHeight: number
	minHeight?: number
	expanded?: boolean
	onToggle?: () => void
	onClose?: () => void
	onFocus?: (event: React.FocusEvent<HTMLElement>) => void
	onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void
	buttonColor?: "dark" | "grey-dark"
	centering?: boolean
	compositeButton?: boolean
	getButtonLabel?: (expanded: boolean) => string
}

export const TextWithToggle = memo((props: TextWithToggleProps) => {
	const {
		className,
		maxHeight,
		minHeight,
		children,
		expanded: controlledExpanded,
		onToggle,
		onClose,
		onFocus,
		onMouseDown,
		getButtonLabel,
		centering,
		compositeButton,
		buttonColor = "dark",
	} = props

	const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
	const [uncontrolledExpanded, setUncontrolledExpanded] =
		useState<boolean>(false)

	const expanded = controlledExpanded ?? uncontrolledExpanded

	const typographyRef = useRef<HTMLParagraphElement>(null)

	const { windowWidth } = useWindowWidth()

	const checkOverflow = useCallback(() => {
		const typography = typographyRef.current

		if (!typography) return

		const scrollHeight = typography.scrollHeight
		
		if (scrollHeight > maxHeight) {
			setIsOverflowing(true)
		} else {
			setIsOverflowing(false)
			if (expanded) {
				if (onClose) {
					onClose()
				} else {
					setUncontrolledExpanded(false)
				}
			}
		}
	}, [maxHeight, expanded, onClose])

	const buttonLabel = getButtonLabel
		? getButtonLabel(expanded)
		: expanded
			? "Скрыть текст"
			: "Показать весь текст"

	useEffect(() => {
		checkOverflow()
	}, [windowWidth, maxHeight, children, checkOverflow])

	const mods: Mods = {
		[styles["expanded"]]: expanded,
		[styles["overflowing"]]: isOverflowing,
		[styles["centering"]]: centering,
	}

	const additionalClasses: AdditionalClasses = [className, styles[buttonColor]]

	return (
		<div className={classNames(styles["container"], additionalClasses, mods)}>
			<p
				ref={typographyRef}
				style={{ maxHeight: expanded ? "none" : maxHeight, minHeight }}
				className={styles["text"]}
			>
				{children}
			</p>
			{isOverflowing &&
				(compositeButton ? (
					<CompositeItem
						render={
							<button
								className={styles["toggle-button"]}
								onFocus={onFocus}
								onMouseDown={onMouseDown}
								onClick={
									onToggle ? onToggle : () => setUncontrolledExpanded((prev) => !prev)
								}
							>
								{buttonLabel}
							</button>
						}
					/>
				) : (
					<button
						className={styles["toggle-button"]}
						onClick={
							onToggle ? onToggle : () => setUncontrolledExpanded((prev) => !prev)
						}
						onFocus={onFocus}
						onMouseDown={onMouseDown}
					>
						{buttonLabel}
					</button>
				))}
		</div>
	)
})
