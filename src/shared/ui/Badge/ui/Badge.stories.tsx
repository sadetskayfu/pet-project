import { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'
import { useState } from 'react'
import { IconButton } from '@/shared/ui/IconButton'
import { BookMark, Minus, Plus } from '@/shared/assets/icons'

const meta: Meta<typeof Badge> = {
	title: 'shared/Badge',
	component: Badge,
	args: {
		color: 'primary',
		overlap: 'circular',
		position: 'top-right',
		size: 'm',
		border: false,
		children: <BookMark size='l'/>,
	},
}

export default meta

type Story = StoryObj<typeof Badge>

const BadgeWrapper = (args: any) => {
	const [count, setCount] = useState<number>(2)

	const handleIncrement = () => {   
		setCount((prev) => prev + 1)
	}
	const handleDecrement = () => {
        if(count === 0) return
		setCount((prev) => prev - 1)
	}

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<IconButton size="xs" variant="clear" color='red' onClick={handleDecrement}>
				<Minus />
			</IconButton>
			<Badge badgeContent={count} {...args} />
			<IconButton size="xs" variant="clear" color='green' onClick={handleIncrement}>
				<Plus />
			</IconButton>
		</div>
	)
}

export const Default: Story = {
	render: (args) => BadgeWrapper(args),
}

export const WithMaxCount: Story = {
	args: {
		badgeContent: 999,
		max: 99,
	}
}

export const AlwaysVisibleBadge: Story = {
    args: {
        badgeContent: '',
        size: 's',
        visible: true,
    }
}
