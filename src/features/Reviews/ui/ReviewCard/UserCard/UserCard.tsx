import { Badge } from "@/shared/ui/Badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes"
import { Typography } from "@/shared/ui/Typography"
import { Avatar } from "@/shared/ui/Avatar"
import { memo } from "react"
import { getFirstLetter } from "@/shared/helpers/formattingString"
import { CompositeItem } from "@floating-ui/react"
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
	const { id, name, country, totalReviews, avatarUrl, isComment, isUser } = props

	return (
		<div className={styles["user-card"]}>
			<Badge
				aria-label={`Общее количество отзывов у пользователя: ${totalReviews}`}
				size="l"
				color="secondary"
				badgeContent={totalReviews}
				visible
				border
			>
				<Tooltip placement="bottom-start">
					<TooltipTrigger>
						<CompositeItem
							render={
								<Link
									className={styles["avatar-link"]}
									aria-label={`Перейти на страницу профиля к пользователю ${name}`}
									to={`${ROUTES.USER_PROFILE}/${id}`}
								>
									<Avatar
										src={avatarUrl}
										size={isComment ? "m" : "l"}
										alt="Аватар пользователя"
										border={isUser ? 'primary' : 'none'}
									>
										{getFirstLetter(name).toLocaleUpperCase()}
									</Avatar>
								</Link>
							}
						/>
					</TooltipTrigger>
					<TooltipContent className={styles["avatar-tooltip"]}>
						<Typography color="hard" size="helper">
							Перейти на страницу профиля к пользователю
						</Typography>
						<Typography size="helper">{name}</Typography>
					</TooltipContent>
				</Tooltip>
			</Badge>
			<div className={styles["user-info"]}>
				<Typography color={isUser ? "primary" : "hard"}>{name}</Typography>
				<Typography>{country}</Typography>
			</div>
		</div>
	)
})
