import {
	TooltipWithoutPortal,
	TooltipWithoutPortalBorderRadius,
	TooltipWithoutPortalPlacement
} from '@/shared/ui/TooltipWithoutPortal'
import { HelperTextWithCheckMark } from '@/shared/ui/HelperTextWithCheckMark'
import { memo } from 'react'
import { patterns } from '@/shared/helpers/patterns'
import styles from './style.module.scss'

interface PasswordHelperTooltipProps {
	id: string
	value: string
	open: boolean
	placement?: TooltipWithoutPortalPlacement
	borderRadius?: TooltipWithoutPortalBorderRadius
}

export const PasswordHelperTooltip = memo((props: PasswordHelperTooltipProps) => {
	const { id, value, open, placement, borderRadius = 'm' } = props

	const isValidLength = value.length >= 6 && value.length <= 15
	const isNotContainSpecialCharacters = !patterns.containSpecialCharacter.test(value)
	const isContainUppercaseLetter = patterns.containUppercase.test(value)

	return (
		<TooltipWithoutPortal
			placement={placement}
			borderRadius={borderRadius}
			open={open}
			id={id}
			className={styles['tooltip']}
		>
			<div className={styles['content']}>
				<HelperTextWithCheckMark
					label="Password length 6-15 characters"
					valid={isValidLength}
				/>
				<HelperTextWithCheckMark
					label="Password must contain at least one uppercase letter"
					valid={isContainUppercaseLetter}
				/>
				<HelperTextWithCheckMark
					label="Password must consist of only letters and numbers"
					valid={isNotContainSpecialCharacters}
				/>
			</div>
		</TooltipWithoutPortal>
	)
})
