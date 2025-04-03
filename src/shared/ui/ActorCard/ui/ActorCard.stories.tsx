import { Meta, StoryObj } from '@storybook/react'
import { ActorCard } from './ActorCard'
import { IconButton } from '../../IconButton'
import { Edit, Trash } from '@/shared/assets/icons'
import { ActorCardSkeleton } from './ActorCardSkeleton'

const meta: Meta<typeof ActorCard> = {
	title: 'shared/ActorCard',
	component: ActorCard,
	args: {
		firstName: 'Leonardo',
		lastName: 'DiCaprio',
		birthDate: '2011-03-23T00:00:00.000Z',
		photoUrl:
			'https://avatars.mds.yandex.net/get-entity_search/2310675/1130394491/S600xU_2x',
	},
}

export default meta

type Story = StoryObj<typeof ActorCard>

const ActorCardWithActionsWrapper = (args: any) => {
	return (
		<ActorCard
			{...args}
			actions={[
				<IconButton variant='clear' key={1}><Edit /></IconButton>,
				<IconButton variant='clear' color='red' key={2}><Trash /></IconButton>,
			]}
		/>
	)
}

export const Default: Story = {}

export const WithActions: Story = {
        render: (args) => ActorCardWithActionsWrapper(args)
}

export const Skeleton: Story = {
        render: () => <ActorCardSkeleton />
}
