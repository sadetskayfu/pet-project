import { VideoPlayerSource } from "@/shared/ui/VideoPlayer"
import { useMovie } from "../services/useMovie"
import { useLocation, useParams } from "react-router-dom"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs"
import { CustomLink } from "@/shared/ui/CustomLink"
import { ROUTES } from "@/shared/constants/routes"
import { Typography } from "@/shared/ui/Typography"
import { ShowActors, ShowCardInfo, ShowPlayer, ShowPromo } from "@/widgets/Show"
import { ReviewsForMovie } from "@/features/Reviews"
import { classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

const sources: VideoPlayerSource[] = [
	{
		src: "https://kinogo-films.biz/",
		quality: "1080",
	},
	{
		src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		quality: "720",
	},
]

const MoviePage = () => {
	const { movieId } = useParams()

	const location = useLocation()

	const { movie, error, isLoading } = useMovie(Number(movieId))

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
			{error ? (
				<ErrorAlert
					error={error}
					message={`Error while getting movie by id "${movieId}"`}
				/>
			) : isLoading ? (
				<CircularProgress absCenter size="l" aria-label="Loading movie page" />
			) : (
				<>
					<ShowPromo
						{...movie!}
						countries={movie!.countries.map((country) => country.label)}
						genres={movie!.genres.map((genre) => genre.name)}
						entity="movie"
					/>
					<ShowCardInfo
						{...movie!}
						countries={movie!.countries.map((country) => country.label)}
						genres={movie!.genres.map((genre) => genre.name)}
						entity="movie"
					/>
					<ShowActors actors={movie?.actors || []} />
					<ShowPlayer sources={sources} />
					<section className={classNames("section", ["container"])}>
						<Typography color="hard" size="h3" component="h2">
							Отзывы к фильму {movie?.title}
						</Typography>
						<ReviewsForMovie
							totalReviews={movie?.totalReviews || 0}
							movieId={Number(movieId)}
							movieTitle={movie!.title}
							isRated={movie?.isRated}
						/>
					</section>
				</>
			)}
		</div>
	)
}

export default MoviePage
