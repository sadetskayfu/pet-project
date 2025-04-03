import { useEffect, useRef } from 'react'

type UseRefValuesProps = {
	value: any
    inputValue: string
	isOpen: boolean
}

export const useRefValues = (props: UseRefValuesProps) => {
	const { value, inputValue, isOpen } = props

    const inputValueRef = useRef<string>(inputValue)
	const valueRef = useRef<any>(value)
	const isOpenRef = useRef<boolean>(isOpen)

	useEffect(() => {
		inputValueRef.current = inputValue
	}, [inputValue])

	useEffect(() => {
		valueRef.current = value
	}, [value])

	useEffect(() => {
		isOpenRef.current = isOpen
	}, [isOpen])

	return { valueRef, inputValueRef, isOpenRef }
}
