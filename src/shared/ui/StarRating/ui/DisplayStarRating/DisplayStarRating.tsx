import { memo, useMemo } from "react"
import { DisplayStar } from "./DisplayStar"
import { AdditionalClasses, classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

type AriaAttributes = {
    'aria-label'?: string
    'aria-labelledby'?: string
}

interface DisplayStarRatingProps extends AriaAttributes {
	className?: string
    id?: string
	value: number
	maxStars?: number
    size?: 's' | 'm'
}

export const DisplayStarRating = memo((props: DisplayStarRatingProps) => {
	const { className, value, maxStars = 5, size = 'm', ...otherProps } = props

	const renderStars = useMemo(() => {
		return [...Array(maxStars)].map((_, index) => {
			const starValue = index + 1
			const isFullFilled = starValue <= value
			const isThreeQuartersFilled = !isFullFilled && starValue - 0.25 <= value
			const isHalfFilled =
				!isFullFilled && !isThreeQuartersFilled && starValue - 0.5 <= value
			const isQuarterFilled =
				!isFullFilled &&
				!isThreeQuartersFilled &&
				!isHalfFilled &&
				starValue - 0.75 <= value

			return (
				<DisplayStar
					fullFilled={isFullFilled}
					halfFilled={isHalfFilled}
					quarterFilled={isQuarterFilled}
					threeQuartersFilled={isThreeQuartersFilled}
				/>
			)
		})
	}, [maxStars, value])

    const additionalClasses: AdditionalClasses = [
        className,
        styles[size]
    ]

	return (
		<div {...otherProps} className={classNames(styles["star-rating"], additionalClasses)}>
			{renderStars}
		</div>
	)
})
