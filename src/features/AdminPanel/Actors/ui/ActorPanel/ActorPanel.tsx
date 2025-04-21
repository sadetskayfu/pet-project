import { useState } from 'react'
import { ActorList } from '../ActorList/ActorList'
import { SearchInput } from '@/shared/ui/SearchInput'
import { Button } from '@/shared/ui/Button'
import { CreateActorDialogContent } from '../ActorDialogs/CreateActorDialogContent'
import { Dialog, DialogTrigger } from '@/shared/ui/Dialog'
import { useWindowWidth } from '@/app/providers/windowWidth'
import styles from './style.module.scss'

const ActorPanel = () => {
	const [searchValue, setSearchValue] = useState<string>('')

	const { windowWidth } = useWindowWidth()

	return (
		<div className={styles['actor-panel']}>
			<Dialog>
				<div className={styles['actions']}>
					<SearchInput
						className={styles['search-field']}
						variant="outlined"
						label="Найти актера по имени"
						hiddenLabel
						fullWidth
						placeholder="Введите имя актора"
						value={searchValue}
						onChange={setSearchValue}
						borderPlacement={windowWidth > 580 ? 'left' : 'all'}
					/>
					<DialogTrigger>
						<Button borderPlacement={windowWidth > 580 ? 'right' : 'all'} className={styles['create-button']} size="m">Добавить актора</Button>
					</DialogTrigger>
				</div>
				<ActorList searchValue={searchValue} />
				<CreateActorDialogContent />
			</Dialog>
		</div>
	)
}

export default ActorPanel
