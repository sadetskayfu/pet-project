import { Actor } from "@/entities/actors"
import { ActorCard } from "@/shared/ui/ActorCard"
import { memo, useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { NavigateButton } from "./NavigateButton"
import { Typography } from "@/shared/ui/Typography"
import styles from "./style.module.scss"

import "swiper/css"
import { Composite, CompositeItem } from "@floating-ui/react"

interface ShowActorsProps {
	actors: Actor[]
}

export const ShowActors = memo((props: ShowActorsProps) => {
	const { actors } = props

	const renderActors = useMemo(() => {
		return actors.map((actor) => (
			<SwiperSlide key={actor.id}>
				<CompositeItem render={<ActorCard to="/" fullWidth {...actor} />} />
			</SwiperSlide>
		))
	}, [actors])

	return (
		<div className={styles["actors"]}>
			<Typography size="h3" component="h2" color="hard">
				Creators and actors
			</Typography>
			<Swiper className={styles["swiper"]} slidesPerView={10} spaceBetween={20}>
				<Composite>{renderActors}</Composite>
				<NavigateButton direction="prev" />
				<NavigateButton direction="next" />
			</Swiper>
		</div>
	)
})
