import {
	FloatingFocusManager,
	FloatingPortal,
	useTransitionStatus,
} from '@floating-ui/react'
import { useAsideMenuContext } from '../model/useAsideMenuContext'
import { ReactNode, useEffect, useRef } from 'react'
import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { Overlay } from '@/shared/ui/Overlay'
import styles from './style.module.scss'

interface AsideMenuContentProps {
	id?: string
	className?: string
	children: ReactNode
	style?: React.CSSProperties
	zIndex?: number
}

export const AsideMenuContent = (props: AsideMenuContentProps) => {
	const { className, id, children, style, zIndex } = props

	const {
		context,
		refs,
		labelId,
		descriptionId,
		initialFocus,
		returnFocus,
		placement,
		getFloatingProps,
	} = useAsideMenuContext()

	const asideMenuRef = useRef<HTMLDivElement>(null)

	const initialFocusValue = initialFocus != null ? initialFocus : asideMenuRef

	const { isMounted, status } = useTransitionStatus(context, {
		duration: 200,
	})

	useEffect(() => {
		if (status === 'close') {
			if (typeof returnFocus === 'boolean') {
				if (returnFocus) {
					const referenceEl = refs.reference.current as HTMLElement | null
					referenceEl?.focus()
				}
			} else {
				returnFocus.current?.focus()
			}
		}
	}, [status, returnFocus, refs.reference])

	const additionalClasses: AdditionalClasses = [className, styles[placement]]

	const mods: Mods = {
		[styles['open']]: status === 'open',
		[styles['close']]: status === 'close',
	}

	if (!isMounted) return null

	return (
		<FloatingPortal>
			<Overlay
				lockScroll
				zIndex={zIndex}
				close={status === 'close'}
				open={status === 'open'}
			>
				<FloatingFocusManager
					initialFocus={initialFocusValue}
					returnFocus={false}
					context={context}
					modal={true}
				>
					<div ref={refs.setFloating} role="presentation">
						<div
							className={classNames(styles['aside-menu'], additionalClasses, mods)}
							style={style}
							ref={asideMenuRef}
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
