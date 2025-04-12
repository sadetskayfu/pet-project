import { memo } from "react"
import { Typography } from "@/shared/ui/Typography"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import { classNames } from "@/shared/helpers/classNames"
import styles from "./style.module.scss"

interface PaginationButtonProps {
	className?: string
	loading?: boolean
	hasNextPage?: boolean
	message?: string
	buttonLabel?: string
	onFetchNextPage: () => void
}

export const PaginationButton = memo((props: PaginationButtonProps) => {
	const { className, loading, hasNextPage, message, buttonLabel = 'Показать еще', onFetchNextPage } = props

	return (
		<div className={classNames(styles["cursor"], [className])}>
			{hasNextPage ? (
				<div style={{ position: "relative" }}>
					<button
						className='text-button'
						onClick={onFetchNextPage}
						disabled={loading}
					>
						{buttonLabel}
					</button>
					{loading && <CircularProgress absCenter />}
				</div>
			) : (
				<Typography textAlign="center" color="soft" size="default">
					{message ?? "Больше ничего нету"}
				</Typography>
			)}
		</div>
	)
})
