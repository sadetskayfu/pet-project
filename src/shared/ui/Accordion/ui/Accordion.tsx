import {
	AdditionalClasses,
	classNames,
	Mods,
} from '@/shared/helpers/classNames'
import { ReactNode } from 'react'
import {
	Collapse,
	CollapseContent,
	CollapseTrigger,
} from '@/shared/ui/Collapse'
import { Minus, Plus } from '@/shared/assets/icons'
import styles from './style.module.scss'

type AccordionVariant = 'filled' | 'outlined'
type AccordionTitleVariant = 'h3' | 'h4'

export interface AccordionProps {
	className?: string
	children: ReactNode
	title: string
	titleVariant?: AccordionTitleVariant
	variant?: AccordionVariant
	disabled?: boolean
	lazy?: boolean
	unmount?: boolean
	tabIndex?: number
	initialOpen?: boolean
	open?: boolean
	setOpen?: () => void
}

export const Accordion = (props: AccordionProps) => {
	const {
		className,
		children,
		title,
		titleVariant = 'h4',
		variant = 'filled',
		disabled,
		lazy,
		unmount,
		tabIndex = 0,
		initialOpen,
		open,
		setOpen,
	} = props

	const mods: Mods = {
		[styles['disabled']]: disabled,
	}

	const additionalClasses: AdditionalClasses = [className, styles[variant]]

	const TitleTag = titleVariant

	return (
		<div className={classNames(styles['accordion'], additionalClasses, mods)}>
			<Collapse
				lazy={lazy}
				unmount={unmount}
				open={open}
				disabledClick={setOpen ? true : false}
				initialOpen={initialOpen}
			>
				<CollapseTrigger>
					<button
						className={styles['header']}
						tabIndex={tabIndex}
						onClick={setOpen}
						disabled={disabled}
					>
						<TitleTag className={styles['title']}>{title}</TitleTag>
						<div className={styles['header-icon']}>
							<Plus className={styles['open-icon']} />
							<Minus className={styles['close-icon']} />
						</div>
					</button>
				</CollapseTrigger>
				<CollapseContent>
					<div className={styles['body']}>{children}</div>
				</CollapseContent>
			</Collapse>
		</div>
	)
}
