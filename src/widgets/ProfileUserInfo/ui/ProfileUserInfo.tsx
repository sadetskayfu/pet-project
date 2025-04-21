import { Typography } from "@/shared/ui/Typography"
import { getDateLabel } from "@/shared/helpers/getDateLabel"
import {  memo, Suspense, useCallback, useId, useRef, useState } from "react"
import { IconButton } from "@/shared/ui/IconButton"
import { Edit } from "@/shared/assets/icons"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { Profile } from "@/entities/profile/model"
import { getAgeLabel } from "@/shared/helpers/getAgeLabel"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { UpdateProfileUserInfoDialog } from "@/features/UpdateProfileUserInfo"
import styles from "./style.module.scss"

interface ProfileUserInfoProps {
	profile: Profile
}

export const ProfileUserInfo = memo(({ profile }: ProfileUserInfoProps) => {
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)
	const updateDialogId = useId()

	const updateProfileButtonRef = useRef<HTMLButtonElement>(null)

	const handleOpenUpdateDialog = useCallback(() => {
		setIsOpenUpdateDialog(true)
	}, [])

	const birthDateLabel = profile.birthDate
		? `${getDateLabel(profile.birthDate)} (${getAgeLabel(profile.birthDate)})`
		: "Не указано"

	return (
		<>
			<div className='section'>
				<div className={styles["header"]}>
					<SectionTitle
						label={profile.isMe ? "Информация обо мне" : "Информация о пользователе"}
					/>
					{profile.isMe && (
						<BaseTooltip label="Изменить информацию о себе">
							<IconButton
								onClick={handleOpenUpdateDialog}
								ref={updateProfileButtonRef}
								aria-label="Изменить информацию о себе"
								aria-controls={isOpenUpdateDialog ? updateDialogId : undefined}
								aria-expanded={isOpenUpdateDialog ? "true" : "false"}
								aria-haspopup="dialog"
								borderRadius="m"
								size="s"
								variant="clear"
							>
								<Edit />
							</IconButton>
						</BaseTooltip>
					)}
				</div>
				<div className={styles["description"]}>
					<div>
						<Typography component="h3">Имя</Typography>
						<span>{profile.firstName || "Не указано"}</span>
					</div>
					<div>
						<Typography component="h3">Фамилия</Typography>
						<span>{profile.lastName || "Не указано"}</span>
					</div>
					<div>
						<Typography component="h3">Дата рождения</Typography>
						<span>{birthDateLabel}</span>
					</div>
					<div>
						<Typography component="h3">Пол</Typography>
						<span>
							{profile.gender === "man"
								? "Мужской"
								: profile.gender === "woman"
									? "Женский"
									: "Не указано"}
						</span>
					</div>
				</div>
			</div>
			{profile.isMe && (
				<Suspense fallback={null}>
					<UpdateProfileUserInfoDialog
						id={updateDialogId}
						returnFocus={updateProfileButtonRef}
						defaultValues={{
							birthDate: profile.birthDate || "",
							firstName: profile.firstName || "",
							lastName: profile.lastName || "",
							displayName: profile.displayName || "",
							gender: profile.gender || "",
						}}
						open={isOpenUpdateDialog}
						setOpen={setIsOpenUpdateDialog}
					/>
				</Suspense>
			)}
		</>
	)
})
