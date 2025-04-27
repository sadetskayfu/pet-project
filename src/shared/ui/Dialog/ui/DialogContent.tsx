import {
	FloatingFocusManager,
	FloatingPortal,
	useTransitionStatus,
} from "@floating-ui/react"
import { useDialogContext } from "../model/useDialogContext"
import { ReactNode, useEffect, useRef } from "react"
import { classNames, Mods } from "@/shared/helpers/classNames"
import { Overlay } from "@/shared/ui/Overlay"
import styles from "./style.module.scss"

interface DialogContentProps {
	id?: string
	containerClassName?: string
	className?: string
	children: ReactNode
	style?: React.CSSProperties
	zIndex?: number
}

export const DialogContent = (props: DialogContentProps) => {
	const {
		id,
		className,
		containerClassName,
		children,
		style,
		zIndex = 1500,
	} = props

	const {
		context,
		refs,
		labelId,
		descriptionId,
		initialFocus,
		returnFocus,
		referenceRef,
		getFloatingProps,
	} = useDialogContext()

	const dialogRef = useRef<HTMLDivElement>(null)

	const initialFocusValue = initialFocus != null ? initialFocus : dialogRef

	const { isMounted, status } = useTransitionStatus(context, {
		duration: 200,
	})

	if (referenceRef) {
		refs.setReference(referenceRef.current)
	}

	useEffect(() => {
		if (status === "close") {
			if (typeof returnFocus === "boolean") {
				if (returnFocus) {
					const referenceEl = refs.reference.current as HTMLElement | null
					referenceEl?.focus()
				}
			} else {
				returnFocus.current?.focus()
			}
		}
	}, [status, returnFocus, refs.reference])

	const mods: Mods = {
		[styles["open"]]: status === "open",
		[styles["close"]]: status === "close",
	}

	if (!isMounted) return null

	return (
		<FloatingPortal>
			<Overlay
				lockScroll
				zIndex={zIndex}
				open={status === "open"}
				close={status === "close"}
			>
				<FloatingFocusManager
					initialFocus={initialFocusValue}
					returnFocus={false}
					context={context}
					modal={true}
				>
					<div
						className={classNames(styles["dialog"], [containerClassName])}
						ref={refs.setFloating}
						role="presentation"
					>
						<div
							className={classNames(styles["content"], [className], mods)}
							style={style}
							ref={dialogRef}
							aria-labelledby={labelId}
							aria-describedby={descriptionId}
							aria-modal="true"
							{...getFloatingProps()}
							{...(id != null ? { id } : {})}
						>
							{children}
						</div>
					</div>
				</FloatingFocusManager>
			</Overlay>
		</FloatingPortal>
	)
}
