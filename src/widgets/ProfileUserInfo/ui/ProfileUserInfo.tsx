import { Typography } from "@/shared/ui/Typography"
import { getDateLabel } from "@/shared/helpers/getDateLabel"
import {
	lazy,
	memo,
	Suspense,
} from "react"
import { Profile } from "@/entities/profile/model"
import { getAgeLabel } from "@/shared/helpers/getAgeLabel"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import styles from "./style.module.scss"

const UpdateUserInfo = lazy(() => import("./UpdateUserInfo/UpdateUserInfo"))

interface ProfileUserInfoProps {
	profile: Profile
}

export const ProfileUserInfo = memo(({ profile }: ProfileUserInfoProps) => {
	const birthDateLabel = profile.birthDate
		? `${getDateLabel(profile.birthDate)} (${getAgeLabel(profile.birthDate)})`
		: "Не указано"

	return (
		<>
			<div className="section">
				<div className={styles["header"]}>
					<SectionTitle
						label={profile.isMe ? "Информация обо мне" : "Информация о пользователе"}
					/>
					{profile.isMe && (
						<Suspense fallback={null}>
							<UpdateUserInfo
								defaultValues={{
									birthDate: profile.birthDate || "",
									firstName: profile.firstName || "",
									lastName: profile.lastName || "",
									displayName: profile.displayName || "",
									gender: profile.gender || "",
								}}
							/>
						</Suspense>
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
		</>
	)
})
