import { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'
import { useCallback, useState } from 'react'
import { IconButton } from '@/shared/ui/IconButton'
import { Arrow, User } from '@/shared/assets/icons'

const meta: Meta<typeof TextField> = {
	title: 'shared/TextField',
	component: TextField,
	args: {
		variant: 'outlined',
		size: 'm',
		borderPlacement: 'all',
		label: 'Label',
		disabled: false,
		readOnly: false,
		required: false,
		fullWidth: false,
		hiddenLabel: false,
		clearButton: false,
		type: 'text',
	},
}

export default meta

type Story = StoryObj<typeof TextField>

const FieldWrapper = (args: any) => {
	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value)
		},
		[]
	)

	const handleValidate = useCallback(() => {
		if (value.length < 4) {
			setError(
				'Слишком короткое значение.'
			)
		} else {
			setError('')
		}
	}, [value.length])

	const handleClear = useCallback(() => {
		setValue('')
	}, [])

	return (
		<div style={{ width: '400px' }}>
			<TextField
				placeholder="Enter password.."
				helperText={error}
				errored={error}
				value={value}
				onBlur={handleValidate}
				onChange={handleChange}
				onClear={handleClear}
				{...args}
			/>
		</div>
	)
}

export const Default: Story = {}

export const WithAdornment: Story = {
	args: {
		startAdornment: 'KG',
		clearButton: true,
	},
}

export const WithActions: Story = {
	args: {
		actions: [
			<IconButton
				stopPropagation
				stopFocus
				variant="clear"
				color="secondary"
			>
				<User />
			</IconButton>,
			<IconButton
				stopPropagation
				stopFocus
				variant="clear"
				color="secondary"
			>
				<Arrow />
			</IconButton>,
		],
	},
}

export const Controlled: Story = {
	render: (args) => FieldWrapper(args),
	args: {
		clearButton: true,
		type: 'password'
	},
}
