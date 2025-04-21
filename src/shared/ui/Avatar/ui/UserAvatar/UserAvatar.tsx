import { ROUTES } from "@/shared/constants/routes"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip"
import { Link } from "react-router-dom"
import { Avatar, AvatarSize } from "../Avatar"
import { getFirstLetter } from "@/shared/helpers/formattingString"
import { Typography } from "@/shared/ui/Typography"
import { Badge, BadgeBorderColor } from "@/shared/ui/Badge"
import { CompositeItem } from "@floating-ui/react"
import styles from "./style.module.scss"

interface UserAvatarProps {
	avatarUrl: string | null
	name: string
	userId: number
	totalReviews: number
	isUser?: boolean
	size?: AvatarSize
	badgeBorderColor?: BadgeBorderColor
	onFocus?: (event: React.FocusEvent<HTMLElement>) => void
}

export const UserAvatar = (props: UserAvatarProps) => {
	const {
		name,
		totalReviews,
		size,
		badgeBorderColor,
		avatarUrl,
		userId,
		isUser,
		onFocus,
	} = props

	return (
		<Badge
			aria-label={`Общее количество отзывов у пользователя: ${totalReviews}`}
			size={size === "l" ? "l" : "m"}
			color="secondary"
			borderColor={badgeBorderColor}
			badgeContent={totalReviews}
			visible
		>
			<Tooltip placement="bottom-start">
				<TooltipTrigger>
					<CompositeItem
						render={
							<Link
								onFocus={onFocus}
								className={styles["avatar-link"]}
								aria-label={`Перейти на страницу профиля к пользователю ${name}`}
								to={`${ROUTES.PROFILE}/${userId}`}
							>
								<Avatar
									border={isUser ? "primary" : "none"}
									src={avatarUrl}
									size={size}
									alt="Аватар пользователя"
								>
									{getFirstLetter(name).toLocaleUpperCase()}
								</Avatar>
							</Link>
						}
					/>
				</TooltipTrigger>
				<TooltipContent maxWidth={300} className={styles["avatar-tooltip"]}>
					<Typography color="hard" size="helper">
						Перейти на страницу профиля к пользователю <br />
						<Typography size="helper">
							{name} ({totalReviews} отзывов)
						</Typography>
						<br />
					</Typography>
				</TooltipContent>
			</Tooltip>
		</Badge>
	)
}
