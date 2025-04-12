import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import { ForwardedRef, forwardRef, HTMLAttributes, memo, ReactNode } from 'react'
import styles from './style.module.scss'

type TypographyTextAlign = 'start' | 'center' | 'end'
type TypographyColor = 'hard' | 'soft' | 'onDark' | 'error' | 'primary' | 'light' | 'inherit'
type TypographyComponent =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'

type TypographySize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'helper' | 'default' | 'inherit'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
	className?: string
	color?: TypographyColor
	component?: TypographyComponent
	size?: TypographySize
	textAlign?: TypographyTextAlign
	overflowWrap?: 'normal' | 'anywhere'
	fontWeight?: 'normal' | 'bold'
	noWrap?: boolean
	children: ReactNode
}

export const Typography = memo(forwardRef((props: TypographyProps, ref: ForwardedRef<any>) => {
	const { className, component = 'span', size = 'default', color = 'soft', textAlign, overflowWrap = 'anywhere', fontWeight = 'normal', noWrap, children, ...otherProps } = props

	const Tag = component

	const additionalClasses: AdditionalClasses = [
		className,
		styles[size],
		styles[`color-${color}`],
		textAlign && styles[textAlign],
		styles[`overflow-wrap-${overflowWrap}`],
		styles[`font-weight-${fontWeight}`]
	]

	const mods: Mods = {
		[styles['no-wrap']]: noWrap
	}

	return (
        <Tag ref={ref} {...otherProps} className={classNames(styles['typography'], additionalClasses, mods)}>
            {children}
        </Tag>
    )
}))
