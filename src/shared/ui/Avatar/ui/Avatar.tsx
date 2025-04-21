import { ImgHTMLAttributes, memo, ReactElement } from 'react'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { getFirstLetter } from '@/shared/helpers/formattingString'
//import { Skeleton } from '@/shared/ui/Skeleton'
import styles from './style.module.scss'

export type AvatarBorderRadius = 's' | 'm' | 'l' | 'circular' | 'none'
export type AvatarSize = 's' | 'm' | 'l'
type AvatarBorderColor = 'dark' | 'primary' | 'none'

interface BaseAvatarProps {
	className?: string
	size?: AvatarSize
	children?: ReactElement | string
	src?: string | null
	alt?: string
	borderRadius?: AvatarBorderRadius
	border?: AvatarBorderColor
	defaultBgColor?: boolean
	style?: React.CSSProperties
	loading?: 'lazy' | 'eager'
}

type HTMLImgProps = Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	keyof BaseAvatarProps
>

export interface AvatarProps extends BaseAvatarProps {
	imgProps?: HTMLImgProps
}

export const Avatar = memo((props: AvatarProps) => {
	const {
		className,
		size,
		children,
		src,
		alt,
		borderRadius = 'circular',
		border = 'none',
		style,
		defaultBgColor = true,
		imgProps,
		loading = 'lazy',
	} = props

	//const [isError, setIsError] = useState(false)
	//const [isLoaded, setIsLoaded] = useState(false)

	const isEmptySrc = !src || src.trim() === ''

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[`border-radius-${borderRadius}`],
		size && styles[`size-${size}`],
		styles[border],
	]

	const mods: Mods = {
		[styles['default-bg-color']]: defaultBgColor,
	}

	const reserveContent = children ? children : getFirstLetter(alt)

	return (
		<div
			style={style}
			className={classNames(styles['avatar'], additionalClasses, mods)}
		>
			{isEmptySrc ? (
				reserveContent
			) : (
				<img
					loading={loading}
					//onError={() => setIsError(true)}
					//onLoad={() => setIsLoaded(true)}
					src={src}
					alt={alt}
					className={styles['img']}
					{...imgProps}
				/>
			)}
			{/* {!isEmptySrc && !isError && !isLoaded && (
				<Skeleton borderRadius={borderRadius} className={styles['skeleton']} />
			)} */}
		</div>
	)
})
