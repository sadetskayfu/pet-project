import { Meta, StoryObj } from '@storybook/react'
import { TagField } from './TagField'
import { useState } from 'react'

const meta: Meta<typeof TagField> = {
	title: 'shared/TagField/TagField',
	component: TagField,
	args: {},
}

export default meta

type Story = StoryObj<typeof TagField>

const TagFieldWrapper = (args: any) => {
	const [value, setValue] = useState<string>('Fantasy')

	const handleUpdata = (value: string) => {
		setValue(value)
		alert(`Genre updated: new genre name: ${value}`)
	}

	const handleDelete = () => {
		alert('Genre deleted')
	}

	const handleValidate = (value: string) => {
		if (value.length < 3) {
			return 'Min length 3 characters'
		}
	}

	return (
		<TagField
			{...args}
            id={1}
			defaultValue={value}
			onUpdate={handleUpdata}
			onDelete={handleDelete}
			onValidate={handleValidate}
		/>
	)
}

export const Default: Story = {
	render: (args) => TagFieldWrapper(args),
	args: {
		label: 'Genre',
		placeholder: 'Enter genre name',
		maxInputWidth: 200,
	},
}
