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
					label="Длина 6-15 символов"
					valid={isValidLength}
				/>
				<HelperTextWithCheckMark
					label="Содержит хотябы 1 заглавную букву"
					valid={isContainUppercaseLetter}
				/>
				<HelperTextWithCheckMark
					label="Не содержит специальных символов"
					valid={isNotContainSpecialCharacters}
				/>
			</div>
		</TooltipWithoutPortal>
	)
})
