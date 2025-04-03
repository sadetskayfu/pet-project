import { Meta, StoryObj } from '@storybook/react'
import { Snackbar } from './Snackbar'
import { useState } from 'react'
import { Alert } from '../../Alert'
import { IconButton } from '../../IconButton'
import { XMark } from '@/shared/assets/icons'

const meta: Meta<typeof Snackbar> = {
	title: 'shared/Snackbar',
	component: Snackbar,
	args: {
		borderRadius: 'm'
	},
}

export default meta

type Story = StoryObj<typeof Snackbar>

const SnackbarWrapper = (args: any) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	return (
		<>
			<button onClick={() => setIsVisible(prev => !prev)}>Show snackbar</button>
			{isVisible && (
				<Snackbar {...args} onClose={() => setIsVisible(false)} autoHideDuration={5000}>
					<Alert
						severity="success"
						actions={[
							<IconButton size="xxs" variant="clear" color="inherit">
								<XMark />
							</IconButton>,
						]}
					>
						Success message
					</Alert>
				</Snackbar>
			)}
		</>
	)
}

export const Default: Story = {
	render: (args) => SnackbarWrapper(args),
	args: {

	},
}
