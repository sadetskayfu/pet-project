import { classNames, Mods } from '@/shared/helpers/classNames'
import { FloatingOverlay } from '@floating-ui/react'
import { ReactNode } from 'react'
import styles from './style.module.scss'

interface OverlayProps {
	children: ReactNode
	lockScroll?: boolean
	open?: boolean
	close?: boolean
	zIndex?: number
}

export const Overlay = (props: OverlayProps) => {
	const { children, lockScroll, open, close, zIndex = 1500 } = props

	const mods: Mods = {
		[styles['open']]: open,
		[styles['close']]: close,
	}

	return (
		<FloatingOverlay
			className={classNames(styles['overlay'], [], mods)}
			lockScroll={lockScroll}
			style={{ zIndex }}
		>
			{children}
		</FloatingOverlay>
	)
}
