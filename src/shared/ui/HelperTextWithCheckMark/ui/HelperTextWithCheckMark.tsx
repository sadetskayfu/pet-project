import { CheckMark } from '@/shared/assets/icons'
import { classNames } from '@/shared/helpers/classNames'
import { memo } from 'react'
import styles from './style.module.scss'

interface HelperTextWithCheckMarkProps {
	valid: boolean
	label: string
}

export const HelperTextWithCheckMark = memo(
	(props: HelperTextWithCheckMarkProps) => {
		const { valid, label } = props

		const mods: Record<string, boolean | undefined> = {
			[styles['valid']]: valid,
		}

		return (
			<div className={classNames(styles['helper-text'], [], mods)}>
				<span className={styles['check-mark']}>
					<CheckMark size="inherit" />
				</span>
				<p>{label}</p>
			</div>
		)
	}
)
