import { Button } from '@/shared/ui/Button'
import {
	Collapse,
	CollapseContent,
	CollapseTrigger,
} from '@/shared/ui/Collapse'
import { SearchInput } from '@/shared/ui/SearchInput'
import { CatalogFilterForm } from '../CatalogFilterForm/CatalogFilterForm'
import { Arrow, XMark } from '@/shared/assets/icons'
import styles from './style.module.scss'

interface DesktopCatalogFilterPanelProps {
	searchValue: string
	onChangeSearchValue: (value: string) => void
	onResetFilters?: () => void
	hasFilter?: boolean
	entity: 'movie' | 'serial'
}

const DesktopCatalogFilterPanel = (props: DesktopCatalogFilterPanelProps) => {
	const {
		searchValue,
		onChangeSearchValue,
		onResetFilters,
		hasFilter = false,
		entity,
	} = props

	return (
		<Collapse initialOpen={hasFilter}>
			<div className={styles['header']}>
				<CollapseTrigger>
					<Button className={styles['collapse-trigger']} variant="outlined" size="m">
						Filter panel
						<Arrow direction="bottom" />
					</Button>
				</CollapseTrigger>
				<SearchInput
					label={`Search ${entity} by title`}
					value={searchValue}
					onChange={onChangeSearchValue}
					hiddenLabel
					placeholder={`Enter ${entity} title`}
					fullWidth
				/>
			</div>
			<CollapseContent>
				<div role="presentation" className={styles['filters']}>
					<CatalogFilterForm />
					<Button
						disabled={!hasFilter}
						onClick={onResetFilters}
						className={styles['reset-button']}
						color='red'
						variant='outlined'
					>
						<XMark />
						Reset filters
					</Button>
				</div>
			</CollapseContent>
		</Collapse>
	)
}

export default DesktopCatalogFilterPanel