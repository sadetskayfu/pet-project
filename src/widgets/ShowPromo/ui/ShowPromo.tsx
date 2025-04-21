import { Typography } from "@/shared/ui/Typography"
import { BookMark, Eye, Play, Star } from "@/shared/assets/icons"
import { classNames } from "@/shared/helpers/classNames"
import { Button } from "@/shared/ui/Button"
import { IconButton } from "@/shared/ui/IconButton"
import { movieMetaDataLabels } from "@/shared/helpers/movieMetaDataLabels"
import { memo, useCallback, useId, useRef, useState } from "react"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { DisplayStarRating } from "@/shared/ui/StarRating"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { useToggleWished } from "../services/useToggleWished"
import { useToggleWatched } from "../services/useToggleWatched"
import { Composite, CompositeItem } from "@floating-ui/react"
import { DelayGroup } from "@/shared/ui/DelayGroup"
import { usePrivateHandler } from "@/shared/hooks"
import { ReviewDialog } from "@/features/Reviews"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { MediaType } from "@/entities/movies"
import styles from "./style.module.scss"

interface ShowPromoProps {
	id: number
	title: string
	rating: number
	totalReviews: number
	releaseDate: string
	duration: number
	ageLimit: number
	posterUrl: string
	genres: string[]
	countries: string[]
	mediaType: MediaType
	isRated: boolean
	isWatched: boolean
	isWished: boolean
}

export const ShowPromo = memo((props: ShowPromoProps) => {
	const {
		id,
		title,
		rating,
		totalReviews,
		genres,
		countries,
		releaseDate,
		duration,
		ageLimit,
		mediaType,
		posterUrl,
		isRated,
		isWatched,
		isWished,
	} = props

	const [isOpenReviewDialog, setIsOpenReviewDialog] = useState<boolean>(false)
	const reviewDialogId = useId()

	const isMutatingRef = useRef<boolean>(false)
	const reviewButtonRef = useRef<HTMLButtonElement>(null)

	const { windowWidth } = useWindowWidth()

	const user = useSelector(userSelectors.getUser)

	const sectionHeight = windowWidth > 1023 ? windowWidth / 2.3 : undefined

	const { toggleWished } = useToggleWished(isMutatingRef)
	const { toggleWatched } = useToggleWatched(isMutatingRef)

	const privateToggleWished = usePrivateHandler(toggleWished)
	const privateToggleWatched = usePrivateHandler(toggleWatched)

	const handleToggleWatched = useCallback(() => {
		privateToggleWatched({ id, title, isWatched })
	}, [privateToggleWatched, id, title, isWatched])

	const handleToggleWished = useCallback(() => {
		privateToggleWished({ id, title, isWished })
	}, [privateToggleWished, id, title, isWished])

	const handleCloseReviewDialog = useCallback(() => {
		setIsOpenReviewDialog(false)
	}, [])

	const handleOpenReviewDialog = usePrivateHandler(
		useCallback(() => setIsOpenReviewDialog(true), [])
	)

	const watchedButtonLabel = isWatched
		? "Убрать из списка просмотренных"
		: "Добавить в список просмотренных"
	const wishedButtonLabel = isWished
		? "Убрать из списка желаемых"
		: "Добавить в список желаемых"
	const reviewButtonLabel = isRated
		? "У вас уже есть отзыв, перейдите в секцию отзывов, чтобы изменить его"
		: "Оценить"

	return (
		<div style={{ height: sectionHeight }} className={styles["promo"]}>
			<div className={styles["img-container"]}>
				<img src={posterUrl} />
			</div>
			<div className={styles["details"]}>
				<Typography
					className={styles["title"]}
					component="h1"
					size="h1"
					color="inherit"
				>
					{title}
				</Typography>
				<div className={styles["rating"]}>
					<DisplayStarRating
						aria-label={`Рейтинг ${rating}`}
						value={rating}
						size="m"
					/>
					<span aria-hidden="true">{rating}</span>
					<BaseTooltip placement="right" label="Общее количество отзывов">
						<Typography
							className={styles["rating__total-reviews"]}
							aria-label="Общее количество отзывов"
							size="helper"
						>
							({totalReviews})
						</Typography>
					</BaseTooltip>
				</div>
				<div className={styles["meta"]}>
					<span>{movieMetaDataLabels.getReleaseDateLabel(releaseDate)}</span>
					<span>{movieMetaDataLabels.getCountryLabels(countries, 2)}</span>
					<span>{movieMetaDataLabels.getGenreLabels(genres, 2)}</span>
					<span>{movieMetaDataLabels.getDurationLabel(duration, mediaType)}</span>
					<span>{ageLimit}+</span>
				</div>
				<div className={styles["actions"]}>
					<div className={styles["actions__watch-buttons"]}>
						<Button size="m" color="primary">
							<Play />
							Смотреть {mediaType === "movie" ? "фильм" : mediaType === 'series' ? 'сериал' : 'мультфильм'}
						</Button>
						<Button size="m">
							Cмотреть трейлер
						</Button>
					</div>
					<Composite
						render={
							<div className={styles["actions__response-buttons"]}>
								<DelayGroup>
									<BaseTooltip label={wishedButtonLabel}>
										<CompositeItem
											render={
												<IconButton
													className={classNames(styles["actions__wished-button"], [], {
														[styles["active"]]: isWished,
													})}
													aria-label={wishedButtonLabel}
													onClick={handleToggleWished}
													borderRadius="m"
													size="m"
												>
													<BookMark />
												</IconButton>
											}
										/>
									</BaseTooltip>
									<BaseTooltip label={watchedButtonLabel}>
										<CompositeItem
											render={
												<IconButton
													className={classNames(styles["actions__watched-button"], [], {
														[styles["active"]]: isWatched,
													})}
													aria-label={watchedButtonLabel}
													onClick={handleToggleWatched}
													borderRadius="m"
													size="m"
												>
													<Eye />
												</IconButton>
											}
										/>
									</BaseTooltip>
									<BaseTooltip maxWidth={300} centering label={reviewButtonLabel}>
										<CompositeItem
											render={
												<IconButton
													onClick={isRated && user ? undefined : handleOpenReviewDialog}
													ref={reviewButtonRef}
													className={classNames(styles["actions__review-button"], [], {
														[styles["active"]]: isRated,
													})}
													aria-label={reviewButtonLabel}
													borderRadius="m"
													size="m"
													aria-haspopup={isRated ? undefined : "dialog"}
													aria-expanded={
														isRated ? undefined : isOpenReviewDialog ? "true" : "false"
													}
													aria-controls={isOpenReviewDialog ? reviewDialogId : undefined}
												>
													<Star />
												</IconButton>
											}
										/>
									</BaseTooltip>
								</DelayGroup>
							</div>
						}
					/>
				</div>
			</div>
			{user && (
				<ReviewDialog
					id={reviewDialogId}
					movieTitle={title}
					movieId={id}
					mediaType={mediaType}
					returnFocus={reviewButtonRef}
					open={isOpenReviewDialog}
					setOpen={setIsOpenReviewDialog}
					onSuccess={handleCloseReviewDialog}
				/>
			)}
		</div>
	)
})
