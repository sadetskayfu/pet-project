import { Avatar } from '@/shared/ui/Avatar'
import { Typography } from '@/shared/ui/Typography'
import { differenceInYears, format, parseISO } from 'date-fns'
import { memo, ReactNode, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { Composite } from '@floating-ui/react'
import styles from './style.module.scss'

export interface ActorCardProps {
	className?: string
	firstName: string
	lastName: string
	birthDate: string
	photoUrl?: string | null
	to?: string
	actions?: ReactNode
	fullWidth?: boolean
}

const calculateAge = (birthDateStr: string): number => {
	const birthDate = parseISO(birthDateStr)
	const today = new Date()
	return differenceInYears(today, birthDate)
}

const getBirthDateLabel = (birthDateStr: string) => {
	const birthDate = parseISO(birthDateStr)
	return format(birthDate, 'dd.MM.yyyy')
}

export const ActorCard = memo((props: ActorCardProps) => {
	const {
		className,
		firstName,
		lastName,
		birthDate,
		photoUrl,
		to,
		actions,
		fullWidth,
	} = props

	const age = useMemo(() => calculateAge(birthDate), [birthDate])
	const birthDateLabel = useMemo(() => getBirthDateLabel(birthDate), [birthDate])

	const ageLabel = `(${age} year)`

	const mods: Mods = {
		[styles['full-width']]: fullWidth,
	}

	const CardContent = () => {
		return (
			<>
				<Avatar
					className={styles['photo']}
					borderRadius="none"
					src={photoUrl}
					alt="Actor photo"
				/>
				<div className={styles['description']}>
					<Typography color="hard">{firstName}</Typography>
					<Typography color="hard">{lastName}</Typography>
					<Typography size="helper">
						{birthDateLabel} {ageLabel}
					</Typography>
				</div>
				{actions && <Composite className={styles['actions']}>{actions}</Composite>}
			</>
		)
	}

	if (to) {
		return (
			<Link className={classNames(styles['card'], [className], mods)} to={to}>
				<CardContent />
			</Link>
		)
	}

	return (
		<div className={classNames(styles['card'], [className], mods)}>
			<CardContent />
		</div>
	)
})
