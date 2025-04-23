import {
	getNextEnabledIndex,
	scrollToItem,
} from '@/shared/lib/keyboardNavigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getLastSelectedOption } from '@/shared/lib/select/getLastSelectedOption'
import { getLastSelectedValue } from './getLastSelectedValue'
import throttle from 'lodash/throttle'

type UseNavigationProps = {
	optionsRef: React.RefObject<HTMLLIElement[]>
	optionListRef: React.RefObject<HTMLUListElement | null>
	valueRef: React.RefObject<string | string[]>
	isOpenRef: React.RefObject<boolean>
	isOpen: boolean
	isLoading?: boolean
	isOptionsReady: boolean
	cols: number
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	onSelect: (value: string) => void
	onDelete: (value: string) => void
}

export const useNavigation = (props: UseNavigationProps) => {
	const {
		optionsRef,
		optionListRef,
		valueRef,
		isOpen,
		isLoading,
		isOptionsReady,
		isOpenRef,
		cols,
		setOpen,
		onSelect,
		onDelete,
	} = props

	const [activeOptionId, setActiveOptionId] = useState<string | undefined>(
		undefined
	)
	const activeIndexRef = useRef<number>(-1)
	const lastActiveOptionRef = useRef<HTMLLIElement | null>(null)

	const setActiveOption = useCallback(
		(index: number) => {
			const lastActiveOption = lastActiveOptionRef.current
			const options = optionsRef.current

			if (lastActiveOption) {
				lastActiveOption.removeAttribute('data-active')
			}

			const nextOption = options[index]

			if (nextOption) {
				const optionId = nextOption.getAttribute('id')

				nextOption.setAttribute('data-active', '')
				lastActiveOptionRef.current = nextOption
				activeIndexRef.current = index
				setActiveOptionId(optionId!)
			} else {
				activeIndexRef.current = -1
				setActiveOptionId(undefined)
			}
		},
		[optionsRef]
	)

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const currentIndex = activeIndexRef.current
			const options = optionsRef.current
			const optionList = optionListRef.current
			const isOpen = isOpenRef.current
			const value = valueRef.current

			let nextIndex = currentIndex

			switch (event.key) {
				case 'ArrowDown':
				case 'ArrowUp':
					event.preventDefault()
					event.stopPropagation()
					if (isOpen) {
						const direction = event.key === 'ArrowDown' ? 1 : -1
						nextIndex = getNextEnabledIndex(options, currentIndex, direction, cols)
					} else {
						setOpen(true)
					}
					break
				case 'ArrowLeft':
                case 'ArrowRight':
					event.preventDefault()
					event.stopPropagation()
					if (isOpen) {
						const direction = event.key === 'ArrowRight' ? 1 : -1
						nextIndex = getNextEnabledIndex(options, currentIndex, direction)
					} else {
						setOpen(true)
					}
					break
				case 'Home':
					if(isOpen) {
						nextIndex = getNextEnabledIndex(options, -1, 1)
					}
					break
				case 'End':
					if(isOpen) {
						nextIndex = getNextEnabledIndex(options, 0, -1)
					}
					break
				case 'Enter':
				case ' ':
					event.stopPropagation()
					event.preventDefault()

					if (isOpen && nextIndex !== -1) {
						onSelect(options[nextIndex].getAttribute('data-value')!)
					} else {
						setOpen((prev) => !prev)
					}
					break
				case 'Backspace':
					if (Array.isArray(value) && value.length > 0) {
						event.preventDefault()
						onDelete(value[value.length - 1])
					}
					break
				default:
					break
			}

			if (nextIndex !== currentIndex) {
				setActiveOption(nextIndex)
				if (optionList) {
					scrollToItem(options[nextIndex], optionList)
				}
			}
		},
		// eslint-disable-next-line
		[setActiveOption, onSelect, onDelete, setOpen, cols]
	)

	const throttledMouseMove = useMemo(
		() =>
			throttle((event: React.MouseEvent) => {
				const option = (event.target as HTMLElement).closest(
					'li'
				) as HTMLLIElement | null

				if (!option) return

				const optionIndex = option.getAttribute('data-index')
				const currentIndex = activeIndexRef.current

				if (optionIndex && Number(optionIndex) !== currentIndex) {
					setActiveOption(Number(optionIndex))
				}
			}, 10),
		[setActiveOption]
	)

	const handleMouseMove = useCallback(
		(event: React.MouseEvent) => throttledMouseMove(event),
		[throttledMouseMove]
	)

	useEffect(() => {
		return () => {
			throttledMouseMove.cancel()
		}
	}, [throttledMouseMove])

	// Set active option after open menu
	useEffect(() => {
		const value = valueRef.current

		if (isOpen && !isLoading && isOptionsReady) {
			const activeIndex = activeIndexRef.current
			const options = optionsRef.current
			const optionList = optionListRef.current

			if(!optionList) return

			if (value.length > 0) {
				const lastSelectedValue = getLastSelectedValue(value)

				const { lastSelectedOption, lastSelectedOptionIndex } =
					getLastSelectedOption(lastSelectedValue, options)

				if (lastSelectedOption && lastSelectedOptionIndex) {
					setActiveOption(Number(lastSelectedOptionIndex))
					scrollToItem(lastSelectedOption, optionList)
				}
			} else {
				const option = options[activeIndex]

				if(option) {
                    setActiveOption(activeIndex)
                    scrollToItem(options[activeIndex], optionList)
                }
			}
		}
		// eslint-disable-next-line
	}, [isOpen, isLoading, isOptionsReady])

	return {
		handleKeyDown,
		handleMouseMove,
		setActiveOption,
		activeOptionId,
		activeIndexRef,
	}
}
