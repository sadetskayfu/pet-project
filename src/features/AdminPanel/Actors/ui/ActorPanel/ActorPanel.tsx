import { useCallback, useState } from 'react'
import { ActorList } from '../ActorList/ActorList'
import { SearchInput } from '@/shared/ui/SearchInput'
import { Button } from '@/shared/ui/Button'
import { CreateActorDialogContent } from '../ActorDialogs/CreateActorDialogContent'
import { useSearchParams } from 'react-router-dom'
import { Dialog, DialogTrigger } from '@/shared/ui/Dialog'
import styles from './style.module.scss'

const ActorPanel = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [searchValue, setSearchValue] = useState<string>(
		searchParams.get('search') || ''
	)

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchValue(value)
			setSearchParams({ search: value })
		},
		[setSearchParams]
	)

	return (
		<section className={styles['section']}>
			<Dialog>
				<div className={styles['actions']}>
					<SearchInput
						variant="outlined"
						label="Search actor by name"
						hiddenLabel
						fullWidth
						placeholder="Enter actor name"
						value={searchValue}
						onChange={handleSearchChange}
						defaultDirty={searchValue.length > 0}
					/>
					<DialogTrigger>
						<Button size="m">Add actor</Button>
					</DialogTrigger>
				</div>
				<ActorList searchValue={searchValue} />
				<CreateActorDialogContent />
			</Dialog>
		</section>
	)
}

export default ActorPanel
