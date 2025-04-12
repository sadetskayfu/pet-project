import { Typography } from "@/shared/ui/Typography"
import { VideoPlayer, VideoPlayerSource } from "@/shared/ui/VideoPlayer"
import styles from './style.module.scss'

interface ShowPlayerProps {
	sources: VideoPlayerSource[]
}

export const ShowPlayer = (props: ShowPlayerProps) => {
	const { sources } = props

	return (
		<div className={styles['section']}>
			<Typography component="h2" color="hard" size="h3">
				Watch movie
			</Typography>
			<VideoPlayer className={styles['video-player']} sources={sources} />
		</div>
	)
}
