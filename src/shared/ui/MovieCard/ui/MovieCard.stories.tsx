import { Meta, StoryObj } from '@storybook/react'
import { MovieCard } from './MovieCard'
import { IconButton } from '../../IconButton'
import { Edit, Trash } from '@/shared/assets/icons'
import { MovieCardSkeleton } from './MovieCardSkeleton'

const meta: Meta<typeof MovieCard> = {
	title: 'shared/MovieCard',
	component: MovieCard,
    args: {
        title: 'Fight Club',
        releaseYear: 1999,
        countries: ['USA', 'BY'],
        duration: 149,
        rating: 8.1,
        genres: ['Action', 'Triller', 'Drama'],
        src: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/85b585ea-410f-4d1c-aaa5-8d242756c2a4/72x108'
    }
}

export default meta

type Story = StoryObj<typeof MovieCard>

const MovieCardWithActionsWrapper = (args: any) => {
	return (
		<MovieCard
			{...args}
			actions={[
				<IconButton borderRadius='s' size='xs' borderPlacement='left' variant='clear' key={1}><Edit /></IconButton>,
				<IconButton borderRadius='s' size='xs' borderPlacement='right' variant='clear' color='red' key={2}><Trash /></IconButton>,
			]}
		/>
	)
}

export const Default: Story = {}

export const WithActions: Story = {
        render: (args) => MovieCardWithActionsWrapper(args)
}

export const Skeleton: Story = {
        render: () => <MovieCardSkeleton />
}
