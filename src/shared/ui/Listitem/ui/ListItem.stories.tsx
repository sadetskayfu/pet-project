import { Meta, StoryObj } from '@storybook/react'
import { ListItem } from './ListItem/ListItem'
import { ListItemLink } from './ListItemLink/ListItemLink'
import { Arrow } from '@/shared/assets/icons'
import { useState } from 'react'
import {
	Collapse,
	CollapseContent,
	CollapseTrigger,
} from '@/shared/ui/Collapse'
import { ListItemButton } from './ListItemButton/ListItemButton'
import { ListItemContent } from './ListItemContent/ListItemContent'

const meta: Meta<typeof ListItem> = {
	title: 'shared/ListItem',
	component: ListItem,
	args: {},
}

export default meta

type Story = StoryObj<typeof ListItem>

const ListWrapperWithCollapse = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div
			style={{ width: '300px', display: 'flex', flexDirection: 'column' }}
			role="list"
		>
			<ListItemLink to="/example1">
				<ListItemContent title="List item 1" />
			</ListItemLink>
			<ListItemLink to="/example2">
				<ListItemContent title="List item 2" />
			</ListItemLink>
			<Collapse open={isOpen} setOpen={setIsOpen}>
				<CollapseTrigger>
					<ListItemButton active={isOpen}>
						<ListItemContent
							title="List item 3"
							description="Open collapse"
							endSlot={<Arrow size="xxs" direction={isOpen ? 'top' : 'right'}/>}
						/>
					</ListItemButton>
				</CollapseTrigger>
				<CollapseContent role='list'>
					<ListItemLink style={{ paddingLeft: '15px' }} to="/example3.1">
						<ListItemContent title="List item 3.1" />
					</ListItemLink>
					<ListItemLink style={{ paddingLeft: '15px' }} to="/example3.2">
						<ListItemContent title="List item 3.2" />
					</ListItemLink>
				</CollapseContent>
			</Collapse>
			<ListItemLink to="/example4">
				<ListItemContent title="List item 4" />
			</ListItemLink>
		</div>
	)
}

export const ExampleItemListWithCollapse: Story = {
	render: () => ListWrapperWithCollapse(),
}
