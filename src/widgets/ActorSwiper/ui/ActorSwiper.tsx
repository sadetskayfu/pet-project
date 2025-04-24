import { ActorCard, ActorCardSkeleton } from "@/shared/ui/ActorCard"
import { memo, useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { ActorForMovie } from "@/entities/actors/model/Actor"
import styles from "./style.module.scss"

interface ActorSwiperProps {
	actors?: ActorForMovie[]
}

export const ActorSwiper = memo((props: ActorSwiperProps) => {
	const { actors } = props

	const renderActors = useMemo(() => {
		if(!actors) {
			return Array(8)
			.fill(null)
			.map(() => (
				<SwiperSlide>
					<ActorCardSkeleton />
				</SwiperSlide>
			))
		}

		if (actors.length > 0) {
			return actors.map((actor) => (
				<SwiperSlide key={actor.id}>
					<ActorCard {...actor} />
				</SwiperSlide>
			))
		}
	}, [actors])

	return (
		<Swiper
			className={styles["actor-swiper"]}
			spaceBetween={30}
			breakpoints={{
				0: { slidesPerView: 2 },
				560: { slidesPerView: 3 },
				760: { slidesPerView: 4 },
				950: { slidesPerView: 5 },
				1180: { slidesPerView: 6 },
				1400: { slidesPerView: 7 },
				1650: { slidesPerView: 8 },
			}}
		>
			{renderActors}
		</Swiper>
	)
})
