import { IconButton } from "@/shared/ui/IconButton"
import {
	ButtonHTMLAttributes,
	cloneElement,
	memo,
	ReactElement,
	useId,
} from "react"
import { classNames } from "@/shared/helpers/classNames"
import { Dislike, Heart } from "@/shared/assets/icons"
import { Info } from "@/shared/assets/icons/ui/Info"
import styles from "./style.module.scss"
import { CompositeItem } from "@floating-ui/react"

interface ActionsProps {
	commentButton?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
	isDisliked: boolean
	isLiked: boolean
	isCommented?: boolean
	isUser?: boolean
	totalLikes: number
	totalDislikes: number
	totalComments?: number
	onToggleLike: () => void
	onToggleDislike: () => void
}

export const Actions = memo((props: ActionsProps) => {
	const {
		commentButton,
		isCommented,
		isDisliked,
		isLiked,
		isUser,
		totalComments,
		totalDislikes,
		totalLikes,
		onToggleDislike,
		onToggleLike,
	} = props

	const id = useId()

	const likeButtonDescriptionId = id + "like-button-description"
	const dislikeButtonDescriptionId = id + "dislike-button-description"
	const commentButtonDescriptionId = id + "comment-button-description"
	const commentInfoBadgeId = id + "comment-info-badge"

	const commentButtonDescriptionIds = isCommented && !isUser
		? [commentButtonDescriptionId, commentInfoBadgeId]
		: [commentButtonDescriptionId]

	return (
		<div className={styles["actions"]}>
			<div className={styles["buttons"]}>
				<div className={styles["button-container"]}>
					<CompositeItem
						render={
							<IconButton
								onClick={onToggleLike}
								aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
								aria-describedby={likeButtonDescriptionId}
								color="inherit"
								variant="clear"
								offset="left"
								size="s"
								className={classNames(styles["like-button"], [], {
									[styles["active"]]: isLiked,
								})}
							>
								<Heart variant={"outlined"} />
							</IconButton>
						}
					/>
					<span
						id={likeButtonDescriptionId}
						aria-label={`Общее количество лайков ${totalLikes}`}
					>
						{totalLikes}
					</span>
				</div>
				<div className={styles["button-container"]}>
					<CompositeItem
						render={
							<IconButton
								onClick={onToggleDislike}
								aria-label={isDisliked ? "Убрать дизлайк" : "Поставить дизлайк"}
								aria-describedby={dislikeButtonDescriptionId}
								variant="clear"
								size="s"
								color="inherit"
								className={classNames(styles["dislike-button"], [], {
									[styles["active"]]: isDisliked,
								})}
							>
								<Dislike />
							</IconButton>
						}
					/>
					<span
						id={dislikeButtonDescriptionId}
						aria-label={`Общее количество дизлайков ${totalDislikes}`}
					>
						{totalDislikes}
					</span>
				</div>
				{commentButton && (
					<div className={styles["button-container"]}>
						{cloneElement(commentButton, {
							"aria-describedby": commentButtonDescriptionIds.join(" "),
						})}
						<span
							id={commentButtonDescriptionId}
							aria-label={`Общее количество комментариев ${totalComments}`}
						>
							{totalComments}
						</span>
					</div>
				)}
			</div>
			{isCommented && commentButton && !isUser && (
				<span id={commentInfoBadgeId} className={styles["comment-info-badge"]}>
					<Info size="s" /> У вас есть комментарий
				</span>
			)}
		</div>
	)
})
