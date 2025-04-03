import { HTMLAttributes, memo, useCallback, useEffect, useRef, useState } from "react"
import { IconButton } from "@/shared/ui/IconButton"
import { FullScreen, Play, Rewind, Volume, XMark } from "@/shared/assets/icons"
import { Pause } from "@/shared/assets/icons/ui/Pause"
import { classNames, Mods } from "@/shared/helpers/classNames"
import { useQuality, Quality } from "../../hooks/useQuality"
import { Typography } from "@/shared/ui/Typography"
import { formatTime } from "../../helpers/formatTime"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { useVolume } from "../../hooks/useVolume"
import { Slider } from "@/shared/ui/Slider"
import { mergeEventHandlers } from "@/shared/helpers/mergeEventHandlers"
import { useProgress } from "../../hooks/useProgress"
import { SettingMenu } from "../SettingMenu/SettingMenu"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { DelayGroup } from "@/shared/ui/DelayGroup"
import { Indicator } from "../Indicator/Indicator"
import { VolumeIndicator } from "../Indicator/VolumeIndicator"
import { useIndicators } from "../../hooks/useIndicators"
import { useVisibilityControlPanel } from "../../hooks/useVisibilityControlPanel"
import { useError } from "../../hooks/useError"
import { Alert } from "@/shared/ui/Alert"
import { formatTimeForAria } from "../../helpers/formatTimeForAria"
import styles from "./style.module.scss"

export type VideoPlayerSource = {
	src: string
	quality: Quality
}

interface VideoPlayerProps extends HTMLAttributes<HTMLElement> {
	className?: string
	sources: VideoPlayerSource[]
	poster?: string
	autoPlay?: boolean
	loop?: boolean
	defaultMuted?: boolean
	defaultVolume?: number
	videoLabel?: string
	videoLabelId?: string
}

export const VideoPlayer = memo((props: VideoPlayerProps) => {
	const {
		className,
		sources,
		defaultMuted = false,
		defaultVolume = 50,
		autoPlay = false,
		poster,
		loop,
		videoLabel,
		videoLabelId,
		...otherProps
	} = props

	const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true)
	const [isEnded, setIsEnded] = useState<boolean>(false)
	const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
	const [duration, setDuration] = useState<number>(0)

	const videoRef = useRef<HTMLVideoElement>(null)
	const playerRef = useRef<HTMLDivElement>(null)

	const { quality, qualityOptions, src, handleQualityChange } =
		useQuality(sources)

	const { isVisibleControlPanel, setVisibleControlPanel } =
		useVisibilityControlPanel()

	const { indicator, showIndicator, volumeIndicator, showVolumeIndicator } =
		useIndicators()

	const { error, handleError, clearError } = useError()

	const {
		volume,
		toggleMuted,
		handleKeyDown: handleKeyDownVolume,
		handleVolumeChange,
		isMuted,
	} = useVolume({
		videoRef,
		defaultMuted,
		defaultVolume,
		showIndicator: showVolumeIndicator,
	})

	const {
		progress,
		handleProgressChange,
		handleRewindNext,
		handleRewindPrev,
		handleTimeUpdate,
		handleKeyDownProgress,
	} = useProgress({ videoRef, duration, showIndicator, setVisibleControlPanel })

	const handleEnded = useCallback(() => {
		setIsEnded(true)
		setIsPlaying(false)
	}, [])

	const handleDraggingEnd = useCallback(() => {
		const video = videoRef.current

		if (!video) return

		setIsPlaying(true)
		video.play()
	}, [videoRef])

	const handleDraggingStart = useCallback(() => {
		if (videoRef.current) {
			setIsPlaying(false)
			videoRef.current.pause()
		}
	}, [videoRef])

	const togglePlay = useCallback(() => {
		const video = videoRef.current

		if (!video) return

		if (isPlaying) {
			video.pause()
		} else {
			video.play()
		}
		setIsPlaying(!isPlaying)
	}, [videoRef, isPlaying])

	const toggleFullscreen = useCallback(() => {
		const player = playerRef.current;
	  
		if (!player) return;
	  
		if (!isFullscreen) {
		  if ('requestFullscreen' in player) {
			player.requestFullscreen();
		  } else if ('webkitRequestFullscreen' in player) {
			(player as any).webkitRequestFullscreen();
		  } else if ('msRequestFullscreen' in player) {
			(player as any).msRequestFullscreen();
		  }
		} else {
		  if ('exitFullscreen' in document) {
			document.exitFullscreen();
		  } else if ('webkitExitFullscreen' in document) {
			(document as any).webkitExitFullscreen();
		  } else if ('msExitFullscreen' in document) {
			(document as any).msExitFullscreen();
		  }
		}
	  }, [isFullscreen]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			switch (event.code) {
				case "KeyK":
				case "Space":
					togglePlay()
					setVisibleControlPanel()
					break
				case "KeyF":
					toggleFullscreen()
					setVisibleControlPanel()
					break
				default:
					break
			}
		},
		[togglePlay, toggleFullscreen, setVisibleControlPanel]
	)

	const handleKeySpaceStopPropagation = useCallback(
		(event: React.KeyboardEvent) => {
			switch (event.key) {
				case " ":
					event.stopPropagation()
					break
				default:
					break
			}
		},
		[]
	)

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}

		document.addEventListener("fullscreenchange", handleFullscreenChange)
		document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
		document.addEventListener("msfullscreenchange", handleFullscreenChange)

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange)
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullscreenChange
			)
			document.removeEventListener("msfullscreenchange", handleFullscreenChange)
		}
	}, [])

	const progressLabel = `${formatTime(progress)} / ${formatTime(duration)}`

	const mods: Mods = {
		[styles["visible-control-panel"]]: isVisibleControlPanel,
	}

	return (
		<div
			onClick={isInitialLoading || error ? undefined : togglePlay}
			className={classNames(styles["video-player"], [className], mods)}
			ref={playerRef}
			tabIndex={0}
			onKeyDown={
				isInitialLoading || error
					? undefined
					: mergeEventHandlers([
							handleKeyDownVolume,
							handleKeyDownProgress,
							handleKeyDown,
						])
			}
			aria-label="Video player"
			{...otherProps}
		>
			<video
				ref={videoRef}
				autoPlay={autoPlay}
				muted={isMuted || volume === 0}
				src={src}
				poster={poster}
				loop={loop}
				onPlaying={() => {
					setIsLoading(false)
					setIsEnded(false)
				}}
				onLoadedMetadata={() => {
					setIsInitialLoading(false)
					setDuration(Math.trunc(videoRef.current!.duration))
					clearError()
				}}
				onWaiting={() => setIsLoading(true)}
				onTimeUpdate={handleTimeUpdate}
				onEnded={handleEnded}
				onError={(event) => {
					handleError(event)
					setIsInitialLoading(false)
				}}
				aria-label={videoLabel ?? undefined}
				aria-labelledby={videoLabelId ?? undefined}
			>
			</video>
			<div className={styles["overlay"]}>
				<div
					onClick={(event) => event.stopPropagation()}
					className={styles["control-panel"]}
				>
					{!error && !isInitialLoading && (
						<Slider
							size="s"
							min={0}
							max={duration}
							step={duration < 60 ? 1 : 5}
							tooltip={false}
							hoverTooltip
							value={progress}
							onChange={handleProgressChange}
							onDraggingStart={handleDraggingStart}
							onDraggingEnd={handleDraggingEnd}
							aria-label="Video progress"
							getTooltipLabel={(value) =>
								formatTime(value)
							}
							getAriaValueText={(value) => formatTimeForAria(value)}
						/>
					)}
					<div
						onKeyDown={handleKeySpaceStopPropagation}
						className={styles["actions"]}
					>
						{!error && !isInitialLoading && (
							<>
								<div className={styles["start-actions"]}>
									<DelayGroup>
										<BaseTooltip
											portalTarget={playerRef}
											label={"Rewind by 5 seconds (left arrow)"}
										>
											<IconButton
												aria-label="Press Left Arrow to rewind 5 seconds"
												onClick={handleRewindPrev}
												variant="clear"
												size="xs"
												borderRadius="m"
												borderPlacement="left"
												color="light"
											>
												<Rewind direction="left" />
											</IconButton>
										</BaseTooltip>
										<BaseTooltip
											portalTarget={playerRef}
											label={isPlaying ? "Pause (k)" : "Start play (k)"}
										>
											<IconButton
												aria-label={
													isPlaying ? "Press K to pause" : "Press K to start play"
												}
												className={styles["play-button"]}
												variant="clear"
												size="xs"
												borderRadius="none"
												color="light"
												onClick={togglePlay}
											>
												{isPlaying ? <Pause /> : <Play />}
											</IconButton>
										</BaseTooltip>
										<BaseTooltip
											portalTarget={playerRef}
											label={"Fast forward by 5 seconds (right arrow)"}
										>
											<IconButton
												aria-label="Press Right Arrow to fast forward 5 seconds"
												onClick={handleRewindNext}
												variant="clear"
												size="xs"
												borderRadius="m"
												borderPlacement="right"
												color="light"
											>
												<Rewind direction="right" />
											</IconButton>
										</BaseTooltip>
									</DelayGroup>
								</div>
								<Typography className={styles["progress-label"]}>
									{progressLabel}
								</Typography>
							</>
						)}
						<div className={styles["end-actions"]}>
							<DelayGroup>
								<div className={styles["volume"]}>
									<Slider
										className={styles["volume-slider"]}
										size="xs"
										color="light"
										min={0}
										max={100}
										step={5}
										value={volume}
										onChange={handleVolumeChange}
										aria-label="Volume"
										getAriaValueText={(value) => `${value}$`}
									/>
									<BaseTooltip
										portalTarget={playerRef}
										label={isMuted ? "Unmute (m)" : "Mute (m)"}
									>
										<IconButton
											aria-label={isMuted ? "Press M to unmute" : "Press M to mute"}
											onClick={toggleMuted}
											variant="clear"
											size="xs"
											borderRadius="m"
											color="light"
											borderPlacement="left"
										>
											<Volume
												variant={
													volume === 0 || isMuted ? "mute" : volume >= 50 ? "full" : "low"
												}
											/>
										</IconButton>
									</BaseTooltip>
								</div>
								<SettingMenu
									videoRef={videoRef}
									quality={quality}
									onChangeQuality={handleQualityChange}
									qualityOptions={qualityOptions}
									portalTarget={playerRef}
								/>
								<BaseTooltip
									portalTarget={playerRef}
									label={isFullscreen ? "Exit Full-screen (f)" : "Enter Full-screen (f)"}
								>
									<IconButton
										aria-label={
											isFullscreen
												? "Press F to exit full-screen mode"
												: "Press F to enter full-screen mode"
										}
										size="xs"
										variant="clear"
										borderRadius="m"
										borderPlacement="right"
										color="light"
										onClick={toggleFullscreen}
									>
										<FullScreen variant={isFullscreen ? "exit" : "enter"} />
									</IconButton>
								</BaseTooltip>
							</DelayGroup>
						</div>
					</div>
				</div>
			</div>
			{error && (
				<Alert
					className={styles["error-alert"]}
					severity="error"
					variant="clear"
					icon={<XMark size="l" variant="outlined" />}
				>
					{error}
				</Alert>
			)}
			<Indicator
				visible={!isPlaying && !isInitialLoading && !error}
				variant={isEnded ? "restart" : isPlaying ? "pause" : "play"}
			/>
			<Indicator
				visible={Boolean(indicator && indicator.type === "rewind")}
				variant="rewind"
				label={indicator?.label}
			/>
			<Indicator
				visible={Boolean(indicator && indicator.type === "fast-forward")}
				variant="fast-forward"
				label={indicator?.label}
			/>
			<VolumeIndicator
				visible={Boolean(volumeIndicator)}
				variant={isMuted ? "mute" : volumeIndicator?.type}
				value={volume}
			/>
			{(isLoading || isInitialLoading) && (
				<CircularProgress
					zIndex={1}
					aria-label="Loading video"
					absCenter
					size="l"
				/>
			)}
		</div>
	)
})
