import { Button } from '@/shared/ui/Button'
import { SearchInput } from '@/shared/ui/SearchInput'
import { CatalogFilterForm } from '../CatalogFilterForm/CatalogFilterForm'
import { Filter, XMark } from '@/shared/assets/icons'
import { AsideMenu } from '@/shared/ui/AsideMenu'
import { AsideMenuTrigger } from '@/shared/ui/AsideMenu/ui/AsideMenuTrigger'
import { IconButton } from '@/shared/ui/IconButton'
import { AsideMenuContent } from '@/shared/ui/AsideMenu/ui/AsideMenuContent'
import { AsideMenuClose } from '@/shared/ui/AsideMenu/ui/AsideMenuClose'
import { useRef } from 'react'
import { AsideMenuHeading } from '@/shared/ui/AsideMenu/ui/AsideMenuHeading'
import styles from './style.module.scss'

interface MobileCatalogFilterPanelProps {
	searchValue: string
	onChangeSearchValue: (value: string) => void
	onResetFilters?: () => void
	entity: 'movie' | 'serial'
	hasFilter?: boolean
}

const MobileCatalogFilterPanel = (props: MobileCatalogFilterPanelProps) => {
	const { searchValue, onChangeSearchValue, onResetFilters, entity, hasFilter } =
		props

	const closeButtonRef = useRef<HTMLButtonElement>(null)

	return (
		<AsideMenu initialFocus={closeButtonRef} placement="left">
			<div className={styles['header']}>
				<AsideMenuTrigger>
					<IconButton
						variant="outlined"
						size="m"
						borderRadius="m"
						aria-label="Open filter aside menu"
					>
						<Filter />
					</IconButton>
				</AsideMenuTrigger>
				<SearchInput
					label={`Search ${entity} by title`}
					value={searchValue}
					onChange={onChangeSearchValue}
					hiddenLabel
					placeholder={`Enter ${entity} title`}
					fullWidth
				/>
			</div>
			<AsideMenuContent className={styles['aside-menu']}>
				<AsideMenuHeading>
					<h5 className="visually-hidden">Filter aside menu</h5>
				</AsideMenuHeading>
				<CatalogFilterForm />
				<Button
					disabled={!hasFilter}
					onClick={onResetFilters}
					className={styles['reset-button']}
					variant="clear"
                    color='red'
				>
					<XMark />
					Reset filters
				</Button>
				<AsideMenuClose>
					<IconButton
						ref={closeButtonRef}
						variant="clear"
						size="s"
						aria-label="Close filter aside menu"
						borderRadius="m"
						className={styles['close-button']}
					>
						<XMark />
					</IconButton>
				</AsideMenuClose>
			</AsideMenuContent>
		</AsideMenu>
	)
}

export default MobileCatalogFilterPanel
