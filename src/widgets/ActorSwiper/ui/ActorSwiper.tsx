import { ActorCard, ActorCardSkeleton } from "@/shared/ui/ActorCard"
import { useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { ActorForMovie } from "@/entities/actors/model/Actor"
import styles from "./style.module.scss"

interface ActorSwiperProps {
	actors: ActorForMovie[]
}

export const ActorSwiper = (props: ActorSwiperProps) => {
	const { actors } = props

	const renderActors = useMemo(() => {
		if (actors.length > 0) {
			return actors.map((actor) => (
				<SwiperSlide key={actor.id}>
					<ActorCard {...actor}/>
				</SwiperSlide>
			))
		}

        return Array(8)
        .fill(null)
        .map((index) => (
            <SwiperSlide key={index}>
                <ActorCardSkeleton />
            </SwiperSlide>
        ))

	}, [actors])

	return (
		<Swiper
			className={styles["actor-swiper"]}
            spaceBetween={30}
            slidesPerView={8}
			breakpoints={{
                0: {slidesPerView: 2},
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
}
