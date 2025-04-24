import { Avatar } from "@/shared/ui/Avatar"
import { Typography } from "@/shared/ui/Typography"
import { memo, ReactNode } from "react"
import { classNames } from "@/shared/helpers/classNames"
import { Composite } from "@floating-ui/react"
import { Badge } from "@/shared/ui/Badge"
import { getAgeLabel } from "@/shared/helpers/getAgeLabel"
import { ActorRole } from "@/entities/actors"
import styles from "./style.module.scss"

export interface ActorCardProps {
	className?: string
	firstName: string
	lastName: string
	birthDate: string
	photoUrl?: string | null
	actions?: ReactNode
	role?: ActorRole
}

export const ActorCard = memo((props: ActorCardProps) => {
	const { className, firstName, lastName, birthDate, photoUrl, actions, role } = props

	const ageLabel = getAgeLabel(birthDate)

	return (
		<div className={classNames(styles["actor-card"], [className])}>
			<Badge size="l" color="secondary" borderColor="dark" className={styles['actor-card__badge']} visible badgeContent={ageLabel}>
				<Avatar
					className={styles["actor-card__photo"]}
					borderRadius="circular"
					src={photoUrl}
				>
					{firstName}
				</Avatar>
			</Badge>
			<div className={styles["actor-card__description"]}>
				<Typography size="helper" color="hard">
					{firstName} {lastName}
				</Typography>
				{role && <Typography size="helper">{role === 'actor' ? 'актор' : role === 'director' ? 'режиссер' : 'сценарист'}</Typography>}
			</div>
			{actions && (
				<Composite className={styles["actor-card__actions"]}>{actions}</Composite>
			)}
		</div>
	)
})
