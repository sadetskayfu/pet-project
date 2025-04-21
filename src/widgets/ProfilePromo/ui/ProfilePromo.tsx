import { Avatar } from "@/shared/ui/Avatar"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { Crown, Gear, Location, Upload } from "@/shared/assets/icons"
import { getReviewSuffix } from "@/shared/helpers/getReviewSuffix"
import { memo, Suspense, useCallback, useId, useRef, useState } from "react"
import { UpdateUserAvatarDialog } from "@/features/UpdateUserAvatar"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { UpdateProfilePosterDialog } from "@/features/UpdateProfilePoster"
import { VIEWPORT } from "@/shared/constants/viewport"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { IconButton } from "@/shared/ui/IconButton"
import { Profile } from "@/entities/profile/model"
import { UpdatePrivateSettingsPopover } from "@/features/UpdatePrivateSettings"
import styles from "./style.module.scss"

interface ProfilePromoProps {
	profile: Profile
}

export const ProfilePromo = memo(({ profile }: ProfilePromoProps) => {
	const [isOpenUpdateAvatarDialog, setIsOpenUpdateAvatarDialog] =
		useState<boolean>(false)
	const [isOpenUpdatePosterDialog, setIsOpenUpdatePosterDialog] =
		useState<boolean>(false)
	const [
		isOpenUpdatePrivateSettingsPopover,
		setIsOpenUpdatePrivateSettingsPopover,
	] = useState<boolean>(false)

	const id = useId()
	const updateAvatarDialogId = id + "update-avatar-dialog"
	const updatePosterDialogId = id + "update-poster-dialog"
	const updatePrivateSettingPopoverId = id + "update-private-settings-popover"

	const updateAvatarButtonRef = useRef<HTMLButtonElement>(null)
	const updatePosterButtonRef = useRef<HTMLButtonElement>(null)
	const updatePrivateSettingsRef = useRef<HTMLButtonElement>(null)

	const { windowWidth } = useWindowWidth()

	const totalReviewLabel = `${profile?.totalReviews} ${getReviewSuffix(profile?.totalReviews || 0)}`

	const handleOpenUpdateAvatarDialog = useCallback(() => {
		setIsOpenUpdateAvatarDialog(true)
	}, [])

	const handleOpenUpdatePosterDialog = useCallback(() => {
		setIsOpenUpdatePosterDialog(true)
	}, [])

	const handleToggleUpdatePrivateSettingsPopover = useCallback(() => {
		setIsOpenUpdatePrivateSettingsPopover((prev) => !prev)
	}, [])

	return (
		<>
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
								<BaseTooltip
									label={profile.avatarMedium ? "Изменить аватар" : "Загрузить аватар"}
								>
									<IconButton
										className={styles["upload-avatar-button"]}
										ref={updateAvatarButtonRef}
										aria-label={
											profile.avatarMedium ? "Изменить аватар" : "Загрузить аватар"
										}
										aria-expanded={isOpenUpdateAvatarDialog ? "true" : "false"}
										aria-haspopup="dialog"
										aria-controls={
											isOpenUpdateAvatarDialog ? updateAvatarDialogId : undefined
										}
										onClick={handleOpenUpdateAvatarDialog}
										color="primary"
										variant="filled"
										size="s"
									>
										<Upload />
									</IconButton>
								</BaseTooltip>
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
							<BaseTooltip label="Изменить настройки приватности">
								<IconButton
									ref={updatePrivateSettingsRef}
									onClick={handleToggleUpdatePrivateSettingsPopover}
									borderRadius="m"
									size="s"
									aria-label="Изменить настройки приватности"
									aria-haspopup="dialog"
									aria-expanded={isOpenUpdatePrivateSettingsPopover ? "true" : "false"}
									aria-controls={
										isOpenUpdatePrivateSettingsPopover
											? updatePrivateSettingPopoverId
											: undefined
									}
								>
									<Gear />
								</IconButton>
							</BaseTooltip>
							<BaseTooltip
								label={profile.posterMedium ? "Изменить постер" : "Загрузить постер"}
							>
								<IconButton
									ref={updatePosterButtonRef}
									aria-label={
										profile.posterMedium ? "Изменить постер" : "Загрузить постер"
									}
									aria-expanded={isOpenUpdatePosterDialog ? "true" : "false"}
									aria-haspopup="dialog"
									aria-controls={
										isOpenUpdatePosterDialog ? updatePosterDialogId : undefined
									}
									onClick={handleOpenUpdatePosterDialog}
									color="primary"
									size="s"
									borderRadius="m"
								>
									<Upload />
								</IconButton>
							</BaseTooltip>
						</div>
					)}
				</div>
			</div>
			{profile.isMe && (
				<Suspense fallback={null}>
					<UpdateUserAvatarDialog
						id={updateAvatarDialogId}
						open={isOpenUpdateAvatarDialog}
						setOpen={setIsOpenUpdateAvatarDialog}
						avatar={profile.avatarMedium}
						returnFocus={updateAvatarButtonRef}
					/>
					<UpdateProfilePosterDialog
						id={updatePosterDialogId}
						open={isOpenUpdatePosterDialog}
						setOpen={setIsOpenUpdatePosterDialog}
						poster={profile.posterMedium}
						returnFocus={updatePosterButtonRef}
					/>
					<UpdatePrivateSettingsPopover
						popoverId={updatePrivateSettingPopoverId}
						referenceRef={updatePrivateSettingsRef}
						open={isOpenUpdatePrivateSettingsPopover}
						setOpen={setIsOpenUpdatePrivateSettingsPopover}
						defaultValues={{
							isHiddenProfile: profile.isHiddenProfile,
							isHiddenWatchedMovies: profile.isHiddenWatchedMovies,
							isHiddenWishedMovies: profile.isHiddenWishedMovies,
						}}
					/>
				</Suspense>
			)}
		</>
	)
})
