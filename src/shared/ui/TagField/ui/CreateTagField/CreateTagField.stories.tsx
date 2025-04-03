import { Meta, StoryObj } from '@storybook/react'
import { CreateTagField } from './CreateTagField'
import { useState } from 'react'


const meta: Meta<typeof CreateTagField> = {
	title: 'shared/TagField/CreateTagField',
	component: CreateTagField,
	args: {},
}

export default meta

type Story = StoryObj<typeof CreateTagField>

const CreateTagFieldWrapper = (args: any) => {
    const [value, setValue] = useState<string>('')

    const handleCreate = (value: string) => {
        alert(`Genre created: ${value}`)
        setValue('')
    }

    const handleValidate = (value: string) => {
        if(value.length < 3) {
            return 'Min length 3 characters'
        }
    }

	return (
		<CreateTagField {...args} value={value} onChange={setValue} onCreate={handleCreate} onValidate={handleValidate}
		/>
	)
}

export const Default: Story = {
    render: (args) => CreateTagFieldWrapper(args),
    args: {
        label: "Genre",
        placeholder: "Enter genre name",
        maxInputWidth: 200,
    }
}


