import { useEffect, useRef } from 'react'

type UseRefValuesProps = {
	value: string | string[]
	isOpen: boolean
}

export const useRefValues = (props: UseRefValuesProps) => {
	const { value, isOpen } = props

	const valueRef = useRef<string | string[]>(value)
	const isOpenRef = useRef<boolean>(isOpen)

	useEffect(() => {
		valueRef.current = value
	}, [value])

	useEffect(() => {
		isOpenRef.current = isOpen
	}, [isOpen])

	return { valueRef, isOpenRef }
}
