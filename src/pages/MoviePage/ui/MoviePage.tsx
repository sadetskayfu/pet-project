import { VideoPlayer, VideoPlayerSource } from '@/shared/ui/VideoPlayer'
//import styles from './style.module.scss'

{/* <iframe width="1330" height="748" src="https://www.youtube.com/embed/K5-a-wjURrc" title="Tanstack query (react-query) полный курс 2024" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

const sources: VideoPlayerSource[] = [
	{
		src: "dhttp://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		quality: '1080'
	},
	{
		src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		quality: '720'
	}
]

const MoviePage = () => {
	return (
		<div className="page">
			<div className="container">
				<VideoPlayer loop sources={sources}/>
			</div>
		</div>
	)
}

export default MoviePage
