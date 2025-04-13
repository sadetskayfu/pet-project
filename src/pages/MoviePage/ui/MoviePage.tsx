import { useMovie } from "../services/useMovie"
import { useLocation, useParams } from "react-router-dom"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs"
import { CustomLink } from "@/shared/ui/CustomLink"
import { ROUTES } from "@/shared/constants/routes"
import { Typography } from "@/shared/ui/Typography"
import { ReviewsForMovie } from "@/features/Reviews"
import { ShowPromo } from "@/widgets/ShowPromo"
import { ShowDescription } from "@/widgets/ShowDescription"
import { LastReviewsForMovie } from "@/widgets/LastReviewsForMovie"
import { PopularReviewsForMovie } from "@/widgets/PopularReviewsForMovie"
import { ActorsForMovie } from "@/widgets/ActorsForMovie"
import { ShowPlayer } from "@/widgets/ShowPlayer"
import { useRef } from "react"
import styles from "./style.module.scss"

const MoviePage = () => {
	const { movieId: strMovieId } = useParams()

	const movieId = Number(strMovieId)

	const location = useLocation()

	const movieVideoPlayerRef = useRef<HTMLDivElement>(null)
	const trailerVideoPlayerRef = useRef<HTMLDivElement>(null)

	const { movie, error, isLoading } = useMovie(movieId)

	const posterUrl =
		"https://www.film.ru/sites/default/files/trailers_frame/looper.jpg"

	const videoUrl = "https://media.w3.org/2010/05/sintel/trailer.mp4"

	return (
		<div className="show-page">
			<div className="container">
				<Breadcrumbs className={styles["breadcrumbs"]} aria-label="Breadcrumbs">
					<CustomLink to={location.state?.from || ROUTES.MOVIES} color="soft">
						Movies
					</CustomLink>
					<Typography color="light">{movie ? movie.title : ""}</Typography>
				</Breadcrumbs>
			</div>
			{isLoading && (
				<CircularProgress absCenter size="l" aria-label="Загрузка фильма" />
			)}
			<ErrorAlert error={error} message={`Ошибка при получении фильма`} />
			{movie && (
				<>
					<ShowPromo
						{...movie}
						countries={movie.countries.map((country) => country.label)}
						genres={movie.genres.map((genre) => genre.name)}
						entity="movie"
						posterUrl={posterUrl}
						movieVideoPlayerRef={movieVideoPlayerRef}
						trailerVideoPlayerRef={trailerVideoPlayerRef}
					/>
					<div className="container">
						<ShowDescription
							{...movie}
							countries={movie.countries.map((country) => country.label)}
							genres={movie.genres.map((genre) => genre.name)}
							entity="movie"
						/>
						<ActorsForMovie movieId={movieId} />
						{movie.totalReviews > 0 && (
							<>
								<PopularReviewsForMovie
									movieId={movieId}
									totalReviews={movie.totalReviews}
								/>
								<LastReviewsForMovie
									movieId={movieId}
									totalReviews={movie.totalReviews}
								/>
							</>
						)}
						<ShowPlayer
							movieTitle={movie.title}
							entity="movie"
							posterUrl={posterUrl}
							sources={[{ src: movie.videoUrl, quality: "1080" }]}
							trailerSources={[{ src: videoUrl, quality: "1080" }]}
							trailerVideoPlayerRef={trailerVideoPlayerRef}
							movieVideoPlayerRef={movieVideoPlayerRef}
						/>
						<ReviewsForMovie
							totalReviews={movie.totalReviews}
							movieId={movieId}
							movieTitle={movie.title}
							isRated={movie.isRated}
							entity="movie"
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default MoviePage
