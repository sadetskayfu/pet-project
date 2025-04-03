import { useContext } from 'react'
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext'

export const useToggleButtonGroupContext = () => {
	const context = useContext(ToggleButtonGroupContext)

	if(!context) {
		throw new Error('Toggle button must be wrapped in <ToggleButtonGroup />')
	}

	return context
}
