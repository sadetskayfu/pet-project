import { Meta, StoryObj } from '@storybook/react'
import { Menu } from './Menu'
import { MenuItem } from '../MenuItem/MenuItem'
import { Button } from '../../../Button'
import { MenuItemContent } from '../MenuItemContent/MenuItemContent'
import { Arrow, Gear, User } from '@/shared/assets/icons'
import { Divider } from '@/shared/ui/Divider'

const meta: Meta<typeof Menu> = {
	title: 'shared/Menu',
	component: Menu,
	args: {
		delay: 0,
		openVariant: 'click',
		placementRoot: 'bottom-start',
		placementNested: 'right-start',
		padding: 5,
		offset: 5,
		flipPadding: 5,
	},
}

export default meta

type Story = StoryObj<typeof Menu>

const MenuWrapper = (args: any) => {
	return (
		<Menu trigger={<Button>Open menu</Button>} {...args}>
			<MenuItem label="profile">
				<MenuItemContent
					title="Profile"
					description="Here you can set up your profile"
					startIcon={<User />}
				/>
			</MenuItem>
			<MenuItem label="setting">
				<MenuItemContent title="Setting" startIcon={<Gear />} />
			</MenuItem>
			<Divider orientation="horizontal" component="li" />
			<MenuItem label="logout">
				<MenuItemContent title="Logout" />
			</MenuItem>
		</Menu>
	)
}

const MenuWithSubMenuWrapper = (args: any) => {
	return (
		<Menu trigger={<Button>Open menu</Button>} {...args}>
			<MenuItem label="menu item 1" onClick={() => console.log('click')}>
				<MenuItemContent title="Menu item 1" />
			</MenuItem>
			<Menu
				trigger={
					<MenuItem stopClose label="menu item 2">
						<MenuItemContent
							title="Menu item 2"
							endIcon={<Arrow direction="right" />}
						/>
					</MenuItem>
				}
				{...args}
			>
				<MenuItem label="menu item 2.1">
					<MenuItemContent title="Menu item 2.1" />
				</MenuItem>
				<MenuItem label="menu item 2.2">
					<MenuItemContent title="Menu item 2.2" />
				</MenuItem>
				<Menu
					trigger={
						<MenuItem stopClose label="menu item 2.3">
							<MenuItemContent title="Menu item 2.3" endIcon={<Arrow direction='right'/>}/>
						</MenuItem>
					}
					{...args}
				>
					<MenuItem label="menu item 2.3.1">
						<MenuItemContent title="Menu item 2.3.1" />
					</MenuItem>
					<MenuItem label="menu item 2.3.2">
						<MenuItemContent title="Menu item 2.3.2" />
					</MenuItem>
				</Menu>
				<MenuItem label="menu item 2.4">
					<MenuItemContent title="Menu item 2.4" />
				</MenuItem>
			</Menu>
		</Menu>
	)
}

export const Default: Story = {
	render: (args) => MenuWrapper(args),
}

export const WithSubMenu: Story = {
	render: (args) => MenuWithSubMenuWrapper(args),
}
