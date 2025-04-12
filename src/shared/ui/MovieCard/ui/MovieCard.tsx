import { Link } from 'react-router-dom'
import { getMinutesText } from '@/shared/helpers/formattingString/getMinutesText'
import { memo, ReactNode, useId, useMemo } from 'react'
import { Typography } from '@/shared/ui/Typography'
import { Avatar } from '@/shared/ui/Avatar'
import { Composite } from '@floating-ui/react'
import { classNames } from '@/shared/helpers/classNames'
import { SoloBadge } from '@/shared/ui/SoloBadge'
import { Star } from '@/shared/assets/icons'
import { getRatingBadgeColor } from '@/shared/helpers/getRatingBadgeColor'
import styles from './style.module.scss'

export interface MovieCardProps {
	className?: string
	title: string
	genres: string[]
	rating: number
	duration: number
	countries: string[]
	releaseYear: number
	src: string
	ageLimit: number
	actions?: ReactNode
	to?: string
	style?: React.CSSProperties
	state?: any
}

export const MovieCard = memo((props: MovieCardProps) => {
	const {
		className,
		to,
		title,
		releaseYear,
		genres,
		style,
		state,
		...otherProps
	} = props

	const labelId = useId()
	const genre = genres.join(' • ').toLowerCase()

	return (
		<div className={classNames(styles['card'], [className])} style={style}>
			{to ? (
				<Link
					to={to}
					state={state}
					aria-labelledby={labelId}
					className={styles['image-container']}
				>
					<SharedContent {...otherProps}/>
				</Link>
			) : (
				<div
					aria-labelledby={labelId}
					tabIndex={0}
					className={styles['image-container']}
				>
					<SharedContent {...otherProps}/>
				</div>
			)}
			<div className={styles['description']}>
				<Typography
					id={labelId}
					noWrap
					color="hard"
					fontWeight="bold"
					size="default"
				>
					{title}
				</Typography>
				<Typography noWrap color="soft" size="helper">
					{releaseYear}, {genre}
				</Typography>
			</div>
		</div>
	)
})

const SharedContent = memo(({ src, countries, duration, actions, rating, ageLimit }: Partial<MovieCardProps>) => {
	const country = countries!.join(' • ')
	const minutes = useMemo(() => getMinutesText(duration!), [duration])
	const ratingBadgeColor = useMemo(() => getRatingBadgeColor(rating!), [rating])

    return (
        <>
            <Avatar className={styles['image']} borderRadius="m" src={src} alt="Movie image" />
            <div className={styles['details']}>
                <Typography color="soft" size="helper">{country}</Typography>
                <Typography color="soft" size="helper">{minutes}</Typography>
                {actions && <Composite className={styles['actions']}>{actions}</Composite>}
            </div>
            <SoloBadge
                className={styles['rating-badge']}
                aria-label={`Movie rating ${rating}`}
                color={ratingBadgeColor}
				endIcon={<Star />}
            >
				{rating!}
			</SoloBadge>
			<SoloBadge className={styles['age-limit-badge']} color='grey' aria-label={`Age limit ${ageLimit} years`}>
				{`${ageLimit}+`}
			</SoloBadge>
        </>
    )
})