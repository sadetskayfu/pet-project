import { SearchInput } from '@/shared/ui/SearchInput'
import { CatalogFilterForm } from '../CatalogFilterForm/CatalogFilterForm'
import { Filter, XMark } from '@/shared/assets/icons'
import { AsideMenu } from '@/shared/ui/AsideMenu'
import { AsideMenuTrigger } from '@/shared/ui/AsideMenu/ui/AsideMenuTrigger'
import { IconButton } from '@/shared/ui/IconButton'
import { AsideMenuContent } from '@/shared/ui/AsideMenu/ui/AsideMenuContent'
import { AsideMenuClose } from '@/shared/ui/AsideMenu/ui/AsideMenuClose'
import { memo, useRef } from 'react'
import { AsideMenuHeading } from '@/shared/ui/AsideMenu/ui/AsideMenuHeading'
import styles from './style.module.scss'

interface MobileCatalogFilterPanelProps {
	searchValue: string
	onChangeSearchValue: (value: string) => void
	onResetFilters: () => void
	hasFilter: boolean
}

const MobileCatalogFilterPanel = memo((props: MobileCatalogFilterPanelProps) => {
	const { searchValue, onChangeSearchValue, onResetFilters, hasFilter } =
		props

	const closeButtonRef = useRef<HTMLButtonElement>(null)

	return (
		<AsideMenu initialFocus={closeButtonRef} placement="left">
			<div className={styles['filter-panel']}>
				<AsideMenuTrigger>
					<IconButton
						variant="outlined"
						size="m"
						borderRadius="m"
						aria-label="Открыть боковое меню фильтрации"
					>
						<Filter />
					</IconButton>
				</AsideMenuTrigger>
				<SearchInput
					label={`Поиск медиа по названию`}
					value={searchValue}
					onChange={onChangeSearchValue}
					hiddenLabel
					placeholder={`Ввведите название медиа`}
					defaultDirty={searchValue.length > 0}
					fullWidth
				/>
			</div>
			<AsideMenuContent className={styles['aside-menu']}>
				<AsideMenuHeading>
					<h2 className="visually-hidden">Фильтры</h2>
				</AsideMenuHeading>
				<CatalogFilterForm hasFilter={hasFilter} onResetFilters={onResetFilters}/>
				<AsideMenuClose>
					<IconButton
						ref={closeButtonRef}
						variant='clear'
						size="s"
						aria-label="Закрыть боковое меню фильтрации"
						borderRadius="m"
						className={styles['aside-menu__close-button']}
					>
						<XMark />
					</IconButton>
				</AsideMenuClose>
			</AsideMenuContent>
		</AsideMenu>
	)
})

export default MobileCatalogFilterPanel
