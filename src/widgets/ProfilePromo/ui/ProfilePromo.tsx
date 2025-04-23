import { Avatar } from "@/shared/ui/Avatar"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { Crown, Location } from "@/shared/assets/icons"
import { getReviewSuffix } from "@/shared/helpers/getReviewSuffix"
import { lazy, memo, Suspense } from "react"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { VIEWPORT } from "@/shared/constants/viewport"
import { Profile } from "@/entities/profile/model"
import styles from "./style.module.scss"

const UploadAvatar = lazy(() => import("./UploadAvatar/UploadAvatar"))
const UploadPoster = lazy(() => import("./UploadPoster/UploadPoster"))
const PrivateSettings = lazy(() => import("./PrivateSettings//PrivateSettings"))

interface ProfilePromoProps {
	profile: Profile
}

export const ProfilePromo = memo(({ profile }: ProfilePromoProps) => {
	const { windowWidth } = useWindowWidth()

	const totalReviewLabel = `${profile?.totalReviews} ${getReviewSuffix(profile?.totalReviews || 0)}`

	return (
		<div className={styles["promo"]}>
			<div
				style={{ height: windowWidth > 1300 ? windowWidth / 3 : undefined }}
				className={styles["poster"]}
			>
				{profile.posterLarge && (
					<picture>
						<source
							media={`(max-width: ${VIEWPORT.MOBILE_S}px)`}
							srcSet={profile.posterSmall || ""}
						/>
						<source
							media={`(max-width: ${VIEWPORT.TABLET}px`}
							srcSet={profile.posterMedium || ""}
						/>
						<source srcSet={profile.posterLarge || ""} />
						<img src={profile.posterLarge || ""} />
					</picture>
				)}
			</div>
			<div className={styles["details"]}>
				<div className={styles["user-card"]}>
					<div className={styles["avatar-container"]}>
						<Avatar
							border="primary"
							className={styles["avatar"]}
							src={profile.avatarMedium}
						/>
						{profile.isMe && (
							<Suspense>
								<UploadAvatar
									className={styles["upload-avatar-button"]}
									hasAvatar={Boolean(profile.avatarMedium)}
								/>
							</Suspense>
						)}
						{profile.totalReviews > 100 && <Crown className={styles["crown"]} />}
						<span className={styles["total-reviews-badge"]}>{totalReviewLabel}</span>
					</div>
					<div className={styles["info"]}>
						<SectionTitle
							label={profile.displayName || profile.email}
							component="h1"
							size="m"
						/>
						<div className={styles["info__location"]}>
							<Location />
							<span>{profile.country.label}</span>
						</div>
					</div>
				</div>
				{profile.isMe && (
					<div className={styles["bottom-actions"]}>
						<Suspense fallback={null}>
							<UploadPoster hasPoster={Boolean(profile.posterLarge)} />
							<PrivateSettings
								defaultValues={{
									isHiddenProfile: profile.isHiddenProfile,
									isHiddenWatchedMovies: profile.isHiddenWatchedMovies,
									isHiddenWishedMovies: profile.isHiddenWishedMovies,
								}}
							/>
						</Suspense>
					</div>
				)}
			</div>
		</div>
	)
})
