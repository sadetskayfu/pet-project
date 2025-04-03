import { isValueSelected } from '@/shared/helpers/isValueSelected'
import { useCallback } from 'react'

type UseChangeValueProps = {
	valueRef: React.RefObject<string | string[]>
	onChange: (value: string | string[]) => void
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	required: boolean | undefined
}

export const useChangeValue = (props: UseChangeValueProps) => {
	const { valueRef, onChange, setOpen, required } = props

	const handleDelete = useCallback((optionValue: string) => {
		const value = valueRef.current

		if (Array.isArray(value)) {
			if(value.length === 1 && required) return

			onChange(value.filter((v) => v !== optionValue))
		} else {
			if(required) return

			onChange('')
		}
	}, [onChange, valueRef, required])

	const handleSelect = useCallback(
		(optionValue: string) => {
			const value = valueRef.current

			const isSelected = isValueSelected(optionValue, value)

			if (isSelected) {
				handleDelete(optionValue)
			} else {
				if (Array.isArray(value)) {
					onChange([...value, optionValue])
				} else {
					onChange(optionValue)
					setOpen(false)
				}
			}
		},
		[handleDelete, onChange, setOpen, valueRef]
	)

    const handleClick = useCallback((event: React.MouseEvent) => {
        const option = (event.target as HTMLElement).closest('li') as HTMLLIElement | null;
		
        if (!option) return;
		
        const optionValue = option.getAttribute('data-value');

        if(optionValue) {
			handleSelect(optionValue)
		}

    }, [handleSelect])

	return { handleSelect, handleDelete, handleClick }
}
