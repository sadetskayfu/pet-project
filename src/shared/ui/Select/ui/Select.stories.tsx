import { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { OptionItem } from '@/shared/ui/OptionItem'
import { useCallback, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Chip } from '@/shared/ui/Chip'
import { Typography } from '@/shared/ui/Typography'

type Option = {
	value: string
	label: string
}

const options = Array.from({ length: 100 }, (_, index) => {
	return {
		value: index + 1 + '',
		label:
			index === 5
				? `TesttypeHeadtesttypeHeadtesttypeHeadtypeHeadtypeHead`
				: `Option ${index + 1}`,
	}
})

const meta: Meta<typeof Select> = {
	title: 'shared/Select',
	component: Select,
	args: {
		children: options.map((option) => {
			return (
				<OptionItem key={option.value} value={option.value}>
					<Typography color="inherit">{option.label}</Typography>
				</OptionItem>
			)
		}),
		options: options,
		label: 'Label',
		placeholder: 'Placeholder..',
		size: 'm',
		variant: 'outlined',
		borderPlacement: 'all',
		disabled: false,
		readOnly: false,
		required: false,
		fullWidth: false,
		fixedHeight: false,
		hiddenLabel: false,
		menuProps: {
			height: undefined,
			width: undefined,
			placement: 'bottom-start',
			flipPadding: 10,
			offset: 5,
		},
	},
}

export default meta

type Story = StoryObj<typeof Select>

const SingleSelectWrapper = (args: any) => {
	const [error, setError] = useState<string | undefined>(undefined)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const value = formData.get('single-select')

		if (!value) {
			setError('Select value')
		} else {
			setError(undefined)
			alert(value)
		}
	}

	const getDisabledOptions = (value: string) => {
		switch (value) {
			case '15':
			case '14':
			case '5':
			case '100':
			case '33':
			case '22':
				return true
		}
		return false
	}

	return (
		<form onSubmit={handleSubmit} style={{ width: '300px' }}>
			<Select<Option, string>
				errored={error}
				helperText={error}
				defaultValue=""
				name="single-select"
				getOptionDisabled={(option) => getDisabledOptions(option.value)}
				getOptionValue={(option) => option.value}
				getOptionLabel={(option) => option.label}
				{...args}
			></Select>
			<Button style={{ marginTop: '10px' }} type="submit">
				Submit
			</Button>
		</form>
	)
}

const MultiSelectWrapper = (args: any) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const value = formData.get('single-select')

		alert(value)
	}

	return (
		<form onSubmit={handleSubmit} style={{ width: '300px' }}>
			<Select<Option, string[]>
				getOptionValue={(option) => option.value}
				getOptionLabel={(option) => option.label}
				defaultValue={[]}
				name="single-select"
				{...args}
			></Select>
			<Button style={{ marginTop: '10px' }} type="submit">
				Submit
			</Button>
		</form>
	)
}

const ControlledWrapper = (args: any) => {
	const [value, setValue] = useState<string[]>(['5', '6'])
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleChange = useCallback((value: string[]) => {
		setValue(value)
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: '10px',
				width: '300px',
			}}
		>
			<span>Selected values: {value.join(' ')}</span>
			<span>Menu: {isOpen ? 'open' : 'closed'}</span>
			<Select<Option, string[]>
				value={value}
				onChange={handleChange}
				open={isOpen}
				setOpen={setIsOpen}
				getOptionValue={(option) => option.value}
				getOptionLabel={(option) => option.label}
				{...args}
			></Select>
		</div>
	)
}

export const Single: Story = {
	render: (args) => SingleSelectWrapper(args),
}

export const Multi: Story = {
	render: (args) => MultiSelectWrapper(args),
}

export const CustomTags: Story = {
	render: (args) => MultiSelectWrapper(args),
	args: {
		renderValue: (option, onClose) => {
			return (
				<Chip
					tabIndex={-1}
					size="s"
					color="secondary"
					label={(option as Option).label}
					key={(option as Option).value}
					onClose={onClose}
				/>
			)
		},
	},
}

export const Controlled: Story = {
	render: (args) => ControlledWrapper(args),
}
