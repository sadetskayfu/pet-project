import { Meta, StoryObj } from '@storybook/react'
import { AsideMenu } from './AsideMenu'
import { Button } from '@/shared/ui/Button'
import { AsideMenuContent } from './AsideMenuContent'
import { AsideMenuTrigger } from './AsideMenuTrigger'
import { AsideMenuDescription } from './AsideMenuDescription'
import { Typography } from '@/shared/ui/Typography'
import { AsideMenuHeading } from './AsideMenuHeading'
import { AsideMenuClose } from './AsideMenuClose'
import { useId, useRef, useState } from 'react'

const meta: Meta<typeof AsideMenu> = {
	title: 'shared/AsideMenu',
	component: AsideMenu,
	args: {
		placement: 'left',
		initialOpen: false,
		returnFocus: true,
	},
}

export default meta

type Story = StoryObj<typeof AsideMenu>

const AsideMenuWrapper = (args: any) => {
	return (
		<AsideMenu {...args}>
			<AsideMenuTrigger>
				<Button size="s">Trigger</Button>
			</AsideMenuTrigger>
			<AsideMenuContent
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					rowGap: '15px',
					padding: '20px',
				}}
			>
				<AsideMenuHeading>
					<Typography size="h5" component="h2" color="hard">
						Heading
					</Typography>
				</AsideMenuHeading>
				<AsideMenuDescription>
					<Typography color="soft" size="helper" component="p">
						Description
					</Typography>
				</AsideMenuDescription>
				<AsideMenuClose>
					<Button color="red" size="xs">
						Close
					</Button>
				</AsideMenuClose>
			</AsideMenuContent>
		</AsideMenu>
	)
}

const ControlledAsideMenuWrapper = (args: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const menuId = useId()
	const triggerRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				ref={triggerRef}
				aria-expanded={isOpen ? 'true' : 'false'}
				aria-haspopup="dialog"
				aria-controls={isOpen ? menuId : undefined}
			>
				Open
			</Button>
			<AsideMenu
				{...args}
				open={isOpen}
				setOpen={setIsOpen}
				returnFocus={triggerRef}
			>
				<AsideMenuContent
					id={menuId}
					style={{
						display: 'flex',
						flexDirection: 'column',
						rowGap: '15px',
						padding: '20px',
					}}
				>
					<AsideMenuHeading>
						<Typography size="h5" component="h2" color="hard">
							Heading
						</Typography>
					</AsideMenuHeading>
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<AsideMenuClose>
						<Button color="red" size="xs">
							Close
						</Button>
					</AsideMenuClose>
				</AsideMenuContent>
			</AsideMenu>
		</>
	)
}

export const Default: Story = {
	render: (args) => AsideMenuWrapper(args),
}

export const Controlled: Story = {
	render: (args) => ControlledAsideMenuWrapper(args),
}
