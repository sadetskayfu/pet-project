import { Button } from '@/shared/ui/Button'
import {
	Collapse,
	CollapseContent,
	CollapseTrigger,
} from '@/shared/ui/Collapse'
import { SearchInput } from '@/shared/ui/SearchInput'
import { CatalogFilterForm } from '../CatalogFilterForm/CatalogFilterForm'
import { Plus } from '@/shared/assets/icons'
import { memo } from 'react'
import styles from './style.module.scss'

interface DesktopCatalogFilterPanelProps {
	searchValue: string
	onChangeSearchValue: (value: string) => void
	onResetFilters: () => void
	hasFilter?: boolean
}

const DesktopCatalogFilterPanel = memo((props: DesktopCatalogFilterPanelProps) => {
	const {
		searchValue,
		onChangeSearchValue,
		onResetFilters,
		hasFilter = false,
	} = props

	return (
		<Collapse initialOpen={hasFilter}>
			<div className={styles['filter-panel']}>
				<h2 className='visually-hidden'>Панель фильтрации</h2>
				<CollapseTrigger>
					<Button className={styles['filter-panel__collapse-trigger']} variant="outlined" size="m">
						Фильтры
						<Plus color='soft'/>
					</Button>
				</CollapseTrigger>
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
			<CollapseContent>
				<div role="presentation" className={styles['filter-panel__collapse-body']}>
					<CatalogFilterForm hasFilter={hasFilter} onResetFilters={onResetFilters} />
				</div>
			</CollapseContent>
		</Collapse>
	)
})

export default DesktopCatalogFilterPanel