import { classNames, Mods } from '@/shared/helpers/classNames'
import { useCollapseContent } from '../model/useCollapseContext'
import { HTMLAttributes } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './style.module.scss'

export const CollapseContent = (props: HTMLAttributes<HTMLElement>) => {
	const { className, children, role = 'region', ...otherProps } = props

	const { open, bodyId, labelId, bodyRef, lazy, unmount } = useCollapseContent()

	const mods: Mods = {
		[styles['open']]: open,
	}

	return (
		<CSSTransition
			nodeRef={bodyRef}
			in={open}
			timeout={350}
			mountOnEnter={lazy}
			unmountOnExit={unmount}
		>
			<div
				className={classNames(styles['body'], [className], mods)}
				ref={bodyRef}
				aria-hidden={open ? undefined : 'true'}
				aria-labelledby={labelId}
				role={role}
				id={bodyId}
				{...otherProps}
			>
				{children}
			</div>
		</CSSTransition>
	)
}
