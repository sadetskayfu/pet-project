import { Meta, StoryObj } from '@storybook/react'
import { Field } from './Field'
import { useRef, useState } from 'react'
import { IconButton } from '../../IconButton'
import { XMark } from '@/shared/assets/icons'

const meta: Meta<typeof Field> = {
	title: 'shared/Field',
	component: Field,
	args: {
		size: 'm',
		variant: 'outlined',
        borderPlacement: 'all',
		label: 'Label',
        hiddenLabel: false,
        disabled: false,
        required: false,
        fullWidth: false,
	},
}

export default meta

type Story = StoryObj<typeof Field>

const FieldWrapper = (args: any, isTextField: boolean) => {
	const [error, setError] = useState<string>('')
	const [isAdornment, setIsAdornment] = useState<boolean>(false)
	const [isActions, setIsActions] = useState<boolean>(false)
	const [isFocused, setIsFocused] = useState<boolean>(false)

	const inputRef = useRef<HTMLInputElement | HTMLDivElement>(null)

	const handleToggleError = () => {
		if (error) {
			setError('')
		} else {
			setError('Error message')
		}
	}

	const handleToggleAdornment = () => {
		if (isAdornment) {
			setIsAdornment(false)
		} else {
			setIsAdornment(true)
		}
	}

	const handleToggleActions = () => {
		if (isActions) {
			setIsActions(false)
		} else {
			setIsActions(true)
		}
	}

	return (
		<div style={{width: '300px'}}>
			<div style={{ display: 'flex', marginBottom: '10px' }}>
				<button
					style={{ color: error ? 'green' : 'black' }}
					onClick={handleToggleError}
				>
					Error
				</button>
				<button
					style={{ color: isAdornment ? 'green' : 'black' }}
					onClick={handleToggleAdornment}
				>
					Start adornment
				</button>
				<button
					style={{ color: isActions ? 'green' : 'black' }}
					onClick={handleToggleActions}
				>
					Actions
				</button>
			</div>
			<Field
				targetFocusRef={inputRef}
				helperText={error}
				errored={error}
				focused={isFocused}
				startAdornment={isAdornment ? 'KG' : undefined}
				actions={
					isActions
						? [
								<IconButton size="xxs" variant="clear">
									<XMark />
								</IconButton>,
							]
						: undefined
				}
				textField={isTextField}
				{...args}
			>
				{isTextField ? (
					<input
						style={{ backgroundColor: 'blue' }}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						ref={inputRef as React.RefObject<HTMLInputElement>}
					/>
				) : (
					<div
						style={{ backgroundColor: 'blue', display: 'flex', alignItems: 'center'}}
						tabIndex={0}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
                        ref={inputRef}
					>
                        Text text text text text text text text text
                    </div>
				)}
			</Field>
		</div>
	)
}

export const WithChildInput: Story = {
	render: (args) => FieldWrapper(args, true),
}

export const WithChildDiv: Story = {
	render: (args) => FieldWrapper(args, false),
}
