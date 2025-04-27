import { MovieForCard } from "@/entities/movies/model"
import { ROUTES } from "@/shared/constants/routes"
import { MovieCard, MovieCardSkeleton } from "@/shared/ui/MovieCard"
import { memo, useCallback, useMemo, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper/types"
import { Virtual } from 'swiper/modules';
import styles from "./style.module.scss"

interface MovieSwiperProps {
	movies: MovieForCard[]
}

export const MovieSwiper = memo((props: MovieSwiperProps) => {
	const { movies } = props

	const [swiper, setSwiper] = useState<SwiperType | null>(null)

    const handleFocus = useCallback(
        (slideIndex: number) => {
            if (swiper) {
                swiper.slideTo(slideIndex)
            }
        },
        [swiper]
    )

	const renderMovies = useMemo(() => {
		if (movies.length > 0) {
			return movies.map((movie, index) => (
				<SwiperSlide key={movie.id}>
					<MovieCard
						{...movie}
						src={movie.cardImgUrl}
						countries={movie.countries.map((country) => country.label)}
						genres={movie.genres.map((genre) => genre.name)}
						to={`${ROUTES.CATALOG}/${movie.id}`}
                        onFocus={() => handleFocus(index)}
						mediaType={movie.type}
					/>
				</SwiperSlide>
			))
		}

		return Array(6)
		.fill(null)
		.map(() => (
			<SwiperSlide >
				<MovieCardSkeleton />
			</SwiperSlide>
		))
	}, [movies, handleFocus])
 
	return (
		<Swiper
			onSwiper={setSwiper}
			className={styles["movie-swiper"]}
			spaceBetween={20}
            modules={[Virtual]}
            virtual
			breakpoints={{
				0: { slidesPerView: 1 },
				500: { slidesPerView: 2 },
				730: { slidesPerView: 3 },
				1000: { slidesPerView: 4 },
				1250: { slidesPerView: 5 },
                1600: {slidesPerView: 6}
			}}
		>
			{renderMovies}
		</Swiper>
	)
})
