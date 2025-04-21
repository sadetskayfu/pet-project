import { Meta, StoryObj } from '@storybook/react'
import { PasswordHelperTooltip } from './PasswordHelperTooltip'
import { useState } from 'react'
import { TextField } from '@/shared/ui/TextField'

const meta: Meta<typeof PasswordHelperTooltip> = {
	title: 'widgets/PasswordHelperTooltip',
	component: PasswordHelperTooltip,
	args: {
		placement: 'top',
        borderRadius: 'm'
	},
}

export default meta

type Story = StoryObj<typeof PasswordHelperTooltip>

const PasswordHelperTooltipWrapper = (args: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | undefined>('')

	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleBlur = () => {
        setError('123')
        handleClose()
    }

	return (
		<div style={{ position: 'relative', width: '300px' }}>
			<TextField
				label="Password"
                value={value}
                onChange={handleChange}
                onFocus={handleOpen}
                onBlur={handleBlur}
                helperText={error}
				errored={!!error}
				type='password'
			/>
			<PasswordHelperTooltip value={value} open={isOpen} {...args} />
		</div>
	)
}

export const Default: Story = {
	render: (args) => PasswordHelperTooltipWrapper(args),
}
