import { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'
import { useState } from 'react'
import { Tab, TabVariant } from '@/shared/ui/Tab'
import { TabPanel } from '@/shared/ui/TabPanel'

const meta: Meta<typeof Tabs> = {
	title: 'shared/Tabs',
	component: Tabs,
	args: {
		orientation: 'horizontal',
		indicatorPosition: 'bottom',
		indicator: false,
		fullWidth: false,
	},
}

export default meta

type Story = StoryObj<typeof Tabs>

const TabsWrapper = (args: any, tabVariant: TabVariant = 'filled') => {
	const [selectedTab, setSelectedTab] = useState<string>('1')

	return (
		<Tabs
			value={selectedTab}
			onChange={setSelectedTab}
			style={{
				display: 'flex',
				gap: tabVariant === 'filled' ? '10px' : '0px',
			}}
			{...args}
		>
			{Array.from({ length: 5 }, (_, index) => {
				const tabValue = index + 1 + ''
				const isDisabled = index === 3
				return (
					<Tab
						disabled={isDisabled}
						value={tabValue}
						label={`Tab ${tabValue}`}
						variant={tabVariant}
						id=""
						panelId=""
					/>
				)
			})}
		</Tabs>
	)
}

const TabsWithPanelWrapper = (args: any, tabVariant: TabVariant = 'filled') => {
	const [selectedTab, setSelectedTab] = useState<string>('1')

	const getTabId = (value: string) => {
		return `storybook-tab-${value}`
	}
	const getPanelId = (value: string) => {
		return `storybook-panel-${value}`
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: args.orientation === 'horizontal' ? 'column' : 'row',
			}}
		>
			<Tabs
				value={selectedTab}
				onChange={setSelectedTab}
				aria-label="Tabs"
				{...args}
			>
				{Array.from({ length: 5 }, (_, index) => {
					const tabValue = index + 1 + ''
					return (
						<Tab
							value={tabValue}
							label={`Tab ${tabValue}`}
							variant={tabVariant}
							id={getTabId(tabValue)}
							panelId={getPanelId(tabValue)}
						/>
					)
				})}
			</Tabs>
			{Array.from({ length: 5 }, (_, index) => {
				const panelValue = index + 1 + ''
				return (
					<TabPanel
						id={getPanelId(panelValue)}
						labelId={getTabId(panelValue)}
						isActive={selectedTab === panelValue}
					>
						<div style={{ padding: '20px' }}>{`Panel ${panelValue}`}</div>
					</TabPanel>
				)
			})}
		</div>
	)
}

export const FilledTabs: Story = {
	render: (args) => TabsWrapper(args, 'filled'),
	args: {
		'aria-label': 'Filled tabs',
	},
}

export const ClearTabsWithIndicator: Story = {
	render: (args) => TabsWrapper(args, 'clear'),
	args: {
		'aria-label': 'Clear tabs',
		indicator: true,
	},
}

export const WithPanel: Story = {
	render: (args) => TabsWithPanelWrapper(args, 'clear'),
	args: {
		'aria-label': 'Tabs with panel',
		indicator: true,
	},
}
