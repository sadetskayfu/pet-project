import { Meta, StoryObj } from '@storybook/react'
import { Tab } from './Tab'
import { House } from '@/shared/assets/icons'
import { Tabs } from '@/shared/ui/Tabs'
import { useState } from 'react'

const meta: Meta<typeof Tab> = {
	title: 'shared/Tab',
	component: Tab,
	args: {
		iconPosition: 'left',
		size: 'm',
		variant: 'filled',
	},
	argTypes: {
		onClick: { action: 'clicked' },
	},
}

export default meta

type Story = StoryObj<typeof Tab>

const Wrapper = (args: any) => {
	const [selectedTab, setSelectedTab] = useState<string>('1')

	return (
		<Tabs
			style={{
				display: 'flex',
				columnGap: args.variant === 'filled' ? '10px' : '0px',
			}}
			value={selectedTab}
			onChange={setSelectedTab}
			indicator={args.variant === 'clear' ? true : false}
		>
			<Tab {...args} value="1" id="" panelId="" />
			<Tab {...args} value="2" id="" panelId="" />
		</Tabs>
	)
}

export const Default: Story = {
	render: (args) => Wrapper(args),
	args: {
		label: 'Default tab',
	},
}

export const WithIcon: Story = {
	render: (args) => Wrapper(args),
	args: {
		icon: <House />,
		label: 'Tab with icon',
	},
}

export const IconTab: Story = {
	render: (args) => Wrapper(args),
	args: {
		icon: <House />,
		'aria-label': 'Icon tab',
	},
}
