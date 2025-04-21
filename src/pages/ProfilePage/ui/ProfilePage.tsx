import { useProfile } from "@/entities/profile"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { ProfilePromo } from "@/widgets/ProfilePromo"
import { ProfileUserInfo } from "@/widgets/ProfileUserInfo"
import { useParams } from "react-router-dom"
import { classNames } from "@/shared/helpers/classNames"
import { Typography } from "@/shared/ui/Typography"
import { UserMovies } from "@/widgets/UserMovies"
import styles from "./style.module.scss"

const ProfilePage = () => {
	const { userId: strUserId } = useParams()

	const userId = Number(strUserId)

	const { profile, error, isLoading } = useProfile(userId)

	return (
		<div className={classNames("page", [styles["profile-page"]])}>
			{error && (
				<div className="container">
					<ErrorAlert
						className={styles["error-alert"]}
						error={error}
						message="Не удалось получить профиль пользователя"
					/>
				</div>
			)}
			{isLoading && (
				<CircularProgress aria-label="Загрузка профиля" size="l" absCenter />
			)}
			{profile && (
				<>
					<ProfilePromo profile={profile} />
					{profile.isMe || !profile.isHiddenProfile ? (
						<div className="container">
							<ProfileUserInfo profile={profile} />
							{profile.isHiddenWatchedMovies && profile.isHiddenWishedMovies && !profile.isMe ? (
								<Typography
									textAlign="center"
									className={styles["private-label"]}
									component="h2"
									size="h4"
									color="error"
								>
									Пользователь скрыл добавленное медиа
								</Typography>
							) : (
								<UserMovies
									userId={profile.userId}
									isMe={profile.isMe}
									gender={profile.gender}
									isHiddenWatched={profile.isHiddenWatchedMovies}
									isHiddenWished={profile.isHiddenWishedMovies}
								/>
							)}
						</div>
					) : (
						<Typography
							textAlign="center"
							className={styles["private-label"]}
							component="h2"
							size="h4"
							color="error"
						>
							Закрытый профиль
						</Typography>
					)}
				</>
			)}
		</div>
	)
}

export default ProfilePage
