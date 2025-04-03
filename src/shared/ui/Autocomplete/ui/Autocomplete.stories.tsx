import { Meta, StoryObj } from '@storybook/react'
import { Autocomplete } from './Autocomplete'
import { useCallback, useState } from 'react'
import { Chip } from '@/shared/ui/Chip'

type Option = {
	value: string
	label: string
}

const options: Option[] = Array.from({ length: 100 }, (_, index) => {
	return {
		value: index + 1 + '',
		label: `Option ${index + 1}`,
	}
})

const meta: Meta<typeof Autocomplete> = {
	title: 'shared/Autocomplete',
	component: Autocomplete,
	args: {},
}

export default meta

type Story = StoryObj<typeof Autocomplete>

const SingleAutocompleteWrapper = () => {
	const getDisabledOptions = (value: string) => {
		switch (value) {
			case '15':
			case '14':
				return true
		}
		return false
	}

	return (
		<div style={{ width: '300px' }}>
			<Autocomplete
				label="Single"
				placeholder="Placeholder"
				options={options}
				getOptionDisabled={(option) => getDisabledOptions(option.value)}
				getOptionLabel={(option) => option.label}
				getOptionValue={(option) => option.value}
			></Autocomplete>
		</div>
	)
}

const FreeSoloWrapper = (multiple: boolean) => {
	const [selectedValue, setSelectedValue] = useState<string | string[]>(
		multiple ? [] : ''
	)

	const handleChange = useCallback((value: string | string[]) => {
		setSelectedValue(value)
	}, [])

	return (
		<div style={{width: '400px', display: 'flex', flexDirection: 'column', rowGap: '20px'}}>
			<span>Selected value: {selectedValue}</span>
			<Autocomplete
				value={selectedValue}
				onChange={handleChange}
				label="Multi free solo"
				options={['One', 'Two', 'Three']}
				renderValue={
					multiple
						? (option, onDelete) => (
								<Chip key={option} label={option} onClose={onDelete} />
							)
						: undefined
				}
				freeSolo
				multiple={multiple}
			/>
		</div>
	)
}

const ControlledWrapper = () => {
	const [value, setValue] = useState<string[]>(['5', '6'])
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleChange = useCallback((value: Option[]) => {
		setValue((value as Option[]).map((v) => v.value))
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: '10px',
				width: '500px',
			}}
		>
			<span>Selected values: {value.join(' ')}</span>
			<span>Menu: {isOpen ? 'open' : 'closed'}</span>
			<Autocomplete
				label="Multi"
				placeholder="Select values"
				value={value.map(
					(v) =>
						({ value: v, label: options.filter((option) => option.value === v) })
							.label[0]
				)}
				onChange={handleChange}
				open={isOpen}
				setOpen={setIsOpen}
				options={options}
				multiple
				getOptionValue={(option) => option.value}
				getOptionLabel={(option) => option.label}
				renderValue={(option, onDelete) => (
					<Chip
						tabIndex={-1}
						size="s"
						color="secondary"
						key={option.value}
						onClose={onDelete}
						label={option.label}
					/>
				)}
			></Autocomplete>
		</div>
	)
}

export const Single: Story = {
	render: () => SingleAutocompleteWrapper(),
}

export const ControlledMulti: Story = {
	render: () => ControlledWrapper(),
}

export const SingleFreeSolo: Story = {
	render: () => FreeSoloWrapper(false),
}

export const MultiFreeSolo: Story = {
	render: () => FreeSoloWrapper(true),
}
