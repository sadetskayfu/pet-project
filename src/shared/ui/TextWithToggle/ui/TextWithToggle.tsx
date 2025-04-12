import { memo, useCallback, useEffect, useRef, useState } from "react"
import { AdditionalClasses, classNames, Mods } from "@/shared/helpers/classNames"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { CompositeItem } from "@floating-ui/react"
import styles from "./style.module.scss"

interface TextWithToggleProps {
	className?: string
	maxHeight: number
	children: string
	expanded?: boolean
	onToggle?: () => void
	onClose?: () => void
	shadowColor?: 'dark' | 'grey-dark'
}

export const TextWithToggle = memo((props: TextWithToggleProps) => {
	const {
		className,
		maxHeight,
		children,
		expanded: controlledExpanded,
		onToggle,
		onClose,
		shadowColor = 'dark'
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
			if(expanded) {
				setIsOverflowing(false)
				onClose?.()
			}
		}
	}, [maxHeight, expanded, onClose])

	useEffect(() => {
		checkOverflow()
	}, [windowWidth, maxHeight, children, checkOverflow])

	const mods: Mods = {
		[styles["expanded"]]: expanded,
		[styles["overflowing"]]: isOverflowing,
	}

	const additionalClasses: AdditionalClasses = [
		className,
		styles[shadowColor]
	]

	return (
		<div className={classNames(styles["container"], additionalClasses, mods)}>
			<p
				ref={typographyRef}
				style={{ maxHeight: expanded ? "none" : maxHeight }}
				className={styles["text"]}
			>
				{children}
			</p>
			{isOverflowing && (
				<CompositeItem
					render={
						<button
							className={styles["toggle-button"]}
							onClick={onToggle ? onToggle : () => setUncontrolledExpanded((prev) => !prev)}
						>
							{expanded ? "Скрыть текст" : "Показать весь текст"}
						</button>
					}
				/>
			)}
		</div>
	)
})
