import { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'
import { useCallback, useState } from 'react'
import { IconButton } from '@/shared/ui/IconButton'
import { Arrow, User } from '@/shared/assets/icons'

const meta: Meta<typeof TextArea> = {
	title: 'shared/TextArea',
	component: TextArea,
	args: {
		variant: 'outlined',
		size: 'm',
		borderPlacement: 'all',
		label: 'Label',
        rows: 1,
        maxHeight: 100,
		disabled: false,
		readOnly: false,
		required: false,
		fullWidth: false,
		hiddenLabel: false,
	},
}

export default meta

type Story = StoryObj<typeof TextArea>

const TextAreaWrapper = (args: any) => {
	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	const handleChange = useCallback(
		(value: string
        ) => {
			setValue(value)
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

	return (
		<div style={{ width: '400px' }}>
			<TextArea
				placeholder="Placeholder"
				helperText={error}
				errored={error}
				value={value}
				onBlur={handleValidate}
				onChange={handleChange}
				{...args}
			/>
		</div>
	)
}

export const Default: Story = {}

export const WithAdornment: Story = {
	args: {
		startAdornment: 'KG',
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
	render: (args) => TextAreaWrapper(args),
}
