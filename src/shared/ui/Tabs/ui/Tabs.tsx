import { ReactNode, useMemo } from 'react'
import { AdditionalClasses, classNames, Mods } from '@/shared/helpers/classNames'
import { IndicatorPosition } from '@/shared/ui/Indicator'
import { Composite } from '@floating-ui/react'
import { TabContext } from '../model/TabContext'
import styles from './style.module.scss'

interface AriaAttributes {
	'aria-label'?: string
	'aria-labelledby'?: string
}

export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabsProps<V extends string> extends AriaAttributes {
	className?: string
	children: ReactNode
	orientation?: TabsOrientation
	indicator?: boolean
	indicatorPosition?: IndicatorPosition
	fullWidth?: boolean
	style?: React.CSSProperties
	value: V
	onChange: (value: V) => void
}

export const Tabs = <V extends string>(props: TabsProps<V>) => {
	const {
		className,
		children,
		value: selectedValue,
		orientation = 'horizontal',
		indicator = false,
		indicatorPosition = 'bottom',
		fullWidth = false,
		style,
		onChange,
		...otherProps
	} = props

	const additionalClasses: AdditionalClasses = [
		className,
		styles[orientation],
	]

	const mods: Mods = {
		[styles['full-width']]: fullWidth
	}

	const contextValue = useMemo(() => ({
		selectedValue,
		onChange,
		indicator,
		indicatorPosition,
		fullWidth
	}), [selectedValue, onChange, indicator, indicatorPosition, fullWidth])

	return (
		<Composite
			className={classNames(styles['tabs'], additionalClasses, mods)}
			role="tablist"
			style={style}
			{...otherProps}
		>
			<TabContext.Provider value={contextValue}>
				{children}
			</TabContext.Provider>
		</Composite>
	)
}
