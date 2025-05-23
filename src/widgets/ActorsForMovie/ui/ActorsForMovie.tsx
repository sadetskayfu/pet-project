import { LongArrow } from "@/shared/assets/icons"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { ActorSwiper } from "@/widgets/ActorSwiper"
import { memo } from "react"
import { useActors } from "../services/useActors"
import { ErrorAlert } from "@/widgets/ErrorAlert"

export const ActorsForMovie = memo(({ movieId }: { movieId: number }) => {
	const { actors, error } = useActors(movieId)

	return (
		<div className="section">
			<div className="section__header">
				<SectionTitle label="Создатели и актеры" />
				<div className="section__header-icons">
					<LongArrow direction="left" />
					<LongArrow direction="right" />
				</div>
			</div>
			{error ? (
				<ErrorAlert error={error} message="Ошибка при получении актеров" />
			) : (
				<ActorSwiper actors={actors} />
			)}
		</div>
	)
})
