import { memo, useEffect } from 'react'
import { classNames } from '@/shared/helpers/classNames'
import { IconButton, IconButtonBorderRadius } from '@/shared/ui/IconButton'
import { Arrow } from '@/shared/assets/icons'
import styles from './style.module.scss'

type PaginationSize = 's' | 'm'
type PaginationColor = 'primary' | 'secondary'
type PaginationBorderRadius = IconButtonBorderRadius

interface PaginationProps {
	className?: string
	borderRadius?: PaginationBorderRadius
	size?: PaginationSize
	color?: PaginationColor
	infinity?: boolean
	totalItems: number
	totalItemsOnPage: number
	currentPage: number
	maxDisplayedPages?: number
	onChange: (page: number) => void
}

export const Pagination = memo(
	({
		className,
		size = 'm',
		color = 'secondary',
		borderRadius = 'full',
		infinity,
		totalItems,
		totalItemsOnPage,
		currentPage,
		maxDisplayedPages = 5,
		onChange,
	}: PaginationProps) => {
		const totalPages = Math.ceil(totalItems / totalItemsOnPage)

		const handleChangePage = (page: number) => {
			if (infinity) {
				if (page > totalPages) {
					onChange(1)
				} else if (page < 1) {
					onChange(totalPages)
				} else {
					onChange(page)
				}
			} else {
				if (page > 0 && page !== totalPages + 1) {
					onChange(page)
				}
			}
		}

		const getPageNumbers = () => {
			const halfDisplayed = Math.floor(maxDisplayedPages / 2)
			let startPage: number
			let endPage: number

			// Range visible page
			if (currentPage < halfDisplayed + 3) {
				startPage = 1
				endPage = Math.min(maxDisplayedPages, totalPages)
			} else if (currentPage > totalPages - halfDisplayed - 2) {
				startPage = Math.max(totalPages - maxDisplayedPages + 1, 1)
				endPage = totalPages
			} else {
				startPage = currentPage - halfDisplayed + 1
				endPage = currentPage + halfDisplayed - 1
			}

			let pageNumbers: Array<string | number> = Array.from(
				{ length: endPage - startPage + 1 },
				(_, i) => startPage + i
			)

			if (startPage > 1) {
				pageNumbers = [1, '...'].concat(pageNumbers)
			}
			if (endPage < totalPages) {
				pageNumbers = pageNumbers.concat(['...', totalPages])
			}

			return pageNumbers
		}


		// Если мы находимся на последней странице и у нас там только 1 айтем, и мы его удаляем, мы переходим на предыдущую страницу
		useEffect(() => {
			if(totalPages > 0 && totalPages < currentPage) {
				onChange(totalPages)
			}
		// eslint-disable-next-line
		}, [totalPages])

		const renderButtons = () => {
			return getPageNumbers().map((page, index) => {
				if (typeof page === 'string') {
					return (
						<li className={styles['list-item']} key={index}>
							...
						</li>
					)
				}

				const isCurrentPage = currentPage === page

				return (
					<li key={index} className={styles['list-item']}>
						<IconButton
							className={styles['button']}
							variant={isCurrentPage ? 'filled' : 'clear'}
							borderRadius={borderRadius}
							color={isCurrentPage ? color : 'secondary'}
							size="custom"
							onClick={() => (!isCurrentPage ? handleChangePage(page) : undefined)}
							aria-current={isCurrentPage ? 'true' : undefined}
							aria-label={isCurrentPage ? `Page ${page}` : `Go to page ${page}`}
						>
							{page}
						</IconButton>
					</li>
				)
			})
		}

		const additionalClasses: Array<string | undefined> = [className, styles[size]]

		if(totalPages < 1) return null

		return (
			<nav
				aria-label="pagination navigation"
				className={classNames(styles['pagination'], additionalClasses)}
			>
				<ul className={styles['list']}>
					<li className={styles['list-item']}>
						<IconButton
							className={styles['button']}
							size="custom"
							variant="clear"
							color="secondary"
							borderRadius={borderRadius}
							onClick={() => handleChangePage(currentPage - 1)}
							disabled={(currentPage === 1 && !infinity) || totalPages === 1}
							aria-label="Preview page"
						>
							<Arrow className={styles['arrow-icon']} />
						</IconButton>
					</li>
					{renderButtons()}
					<li className={styles['list-item']}>
						<IconButton
							className={classNames(styles['button'], [styles['button-next-page']])}
							size="custom"
							variant="clear"
							color="secondary"
							borderRadius={borderRadius}
							onClick={() => handleChangePage(currentPage + 1)}
							disabled={(currentPage === totalPages && !infinity) || totalPages === 1}
							aria-label="Next page"
						>
							<Arrow className={styles['arrow-icon']} />
						</IconButton>
					</li>
				</ul>
			</nav>
		)
	}
)
