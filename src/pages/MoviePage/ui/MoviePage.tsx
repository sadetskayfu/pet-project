import { useMovie } from "../services/useMovie"
import { useParams } from "react-router-dom"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { ReviewsForMovie } from "@/features/Reviews"
import { ShowPromo } from "@/widgets/ShowPromo"
import { ShowDescription } from "@/widgets/ShowDescription"
import { LastReviewsForMovie } from "@/widgets/LastReviewsForMovie"
import { PopularReviewsForMovie } from "@/widgets/PopularReviewsForMovie"
import { ActorsForMovie } from "@/widgets/ActorsForMovie"
import { classNames } from "@/shared/helpers/classNames"
import styles from './style.module.scss'

const MoviePage = () => {
	const { movieId: strMovieId } = useParams()

	const movieId = Number(strMovieId)

	const { movie, error, isLoading } = useMovie(movieId)

	return (
		<div className={classNames("page", [styles["movie-page"]])}>
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
						mediaType={movie.type}
						posterUrl={movie.posterUrl}
					/>
					<div className="container">
						<ShowDescription
							{...movie}
							countries={movie.countries.map((country) => country.label)}
							genres={movie.genres.map((genre) => genre.name)}
							mediaType={movie.type}
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
						<ReviewsForMovie
							totalReviews={movie.totalReviews}
							movieId={movieId}
							movieTitle={movie.title}
							isRated={movie.isRated}
							mediaType={movie.type}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default MoviePage
