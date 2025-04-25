import { Typography } from "@/shared/ui/Typography"
import { UserAvatar } from "@/shared/ui/Avatar"
import { memo } from "react"
import styles from "./style.module.scss"

interface UserCardProps {
	id: number
	name: string
	country: string
	totalReviews: number
	avatarUrl?: string | null
	isComment?: boolean
	isUser?: boolean
}

export const UserCard = memo((props: UserCardProps) => {
	const { id, name, country, isComment, isUser } = props

	return (
		<div className={styles["user-card"]}>
			<UserAvatar {...props} userId={id} size={isComment ? "m" : "l"} />
			<div className={styles["user-info"]}>
				<Typography color={isUser ? "primary" : "hard"}>{name}</Typography>
				<Typography>{country}</Typography>
			</div>
		</div>
	)
})
