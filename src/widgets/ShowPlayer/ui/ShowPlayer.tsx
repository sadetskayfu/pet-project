import { VideoPlayer, VideoPlayerSource } from "@/shared/ui/VideoPlayer"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { memo, useId } from "react"
import { classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

interface ShowPlayerProps {
	movieTitle: string
	sources: VideoPlayerSource[]
	trailerSources: VideoPlayerSource[]
	posterUrl?: string
	movieVideoPlayerRef?: React.ForwardedRef<HTMLDivElement>
	trailerVideoPlayerRef?: React.ForwardedRef<HTMLDivElement>
	entity: "movie" | "series"
}

export const ShowPlayer = memo((props: ShowPlayerProps) => {
	const { sources, trailerSources, posterUrl, movieVideoPlayerRef, trailerVideoPlayerRef, movieTitle, entity } = props

	const id = useId()
	const movieTitleId = id + 'movie'
	const trailerTitleId = id + 'trailer'

	return (
		<div className={styles["section-group"]}>
			<div className={classNames(styles["section"], ["section"])}>
				<SectionTitle id={movieTitleId} label={`Смотреть ${entity === 'movie' ? 'фильм' : 'серил'} ${movieTitle}`} />
				<VideoPlayer
					poster={posterUrl}
					className={styles["video-player"]}
					sources={sources}
					videoLabelId={movieTitleId}
					ref={movieVideoPlayerRef}
				/>
			</div>
			<div className={classNames(styles["section"], ["section"])}>
				<SectionTitle id={trailerTitleId} label={`Смотреть трейлер к ${entity === 'movie' ? 'фильму' : 'серилу'} ${movieTitle}`} />
				<VideoPlayer
					poster={posterUrl}
					className={styles["video-player"]}
					sources={trailerSources}
					videoLabelId={trailerTitleId}
					ref={trailerVideoPlayerRef}
				/>
			</div>
		</div>
	)
})
