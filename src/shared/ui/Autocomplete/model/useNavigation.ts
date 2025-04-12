import {
    getNextEnabledIndex,
    scrollToItem,
} from '@/shared/lib/keyboardNavigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getLastSelectedOption } from '@/shared/lib/select'
import { getLastSelectedValue } from './getLastSelectedValue'
import throttle from 'lodash/throttle'
import { hasSelectedValue } from './hasSelectedValue'

type UseNavigationProps<T> = {
    optionsRef: React.RefObject<HTMLLIElement[]>
    optionListRef: React.RefObject<HTMLUListElement | null>
    inputValueRef: React.RefObject<string>
    valueRef: React.RefObject<T[] | T | null>
    isOpenRef: React.RefObject<boolean>
    isOpen: boolean
    isLoading: boolean
    isOptionsReady: boolean
    isFreeSolo: boolean
    cols: number
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSelect: (value: string) => void
    onDelete: (value: string) => void
    getOptionValue: (value: T) => string
}

export const useNavigation = <T>(props: UseNavigationProps<T>) => {
    const {
        optionsRef,
        optionListRef,
        inputValueRef,
        valueRef,
        isOpen,
        isLoading,
        isFreeSolo,
        isOptionsReady,
        isOpenRef,
        cols,
        setIsOpen,
        onSelect,
        onDelete,
        getOptionValue,
    } = props

    const [activeOptionId, setActiveOptionId] = useState<string | undefined>(
        undefined
    )
    const activeIndexRef = useRef<number>(-1)
    const lastActiveOptionRef = useRef<HTMLLIElement | null>(null)

    const setActiveOption = useCallback(
        (index: number) => {
            console.log('Setting active option')
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
            const inputValue = inputValueRef.current
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
                        setIsOpen(true)
                    }
                    break
                case 'ArrowLeft':
                case 'ArrowRight':
                    if(cols === 1) break

                    event.preventDefault()
                    event.stopPropagation()

                    if (isOpen) {
                        const direction = event.key === 'ArrowRight' ? 1 : -1
                        nextIndex = getNextEnabledIndex(options, currentIndex, direction)
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
                    event.stopPropagation()
                    event.preventDefault()

                    if(isFreeSolo && nextIndex === -1 && inputValue.length > 0) {
                        onSelect(inputValue)
                        break
                    }
                    if (isOpen && nextIndex !== -1) {
                        onSelect(options[nextIndex].getAttribute('data-value')!)
                    } else {
                        setIsOpen((prev) => !prev)
                    }
                    break
                case 'Escape':
                    event.preventDefault()
                    event.stopPropagation()

                    setIsOpen(false)
                    break
                case 'Backspace':
                    if(inputValue.length > 0) break

                    if (Array.isArray(value) && value.length > 0) {
                        event.preventDefault()
                        onDelete(getOptionValue(value[value.length - 1]))
                    }
                    break
                default:
                    break
            }

            if (nextIndex !== currentIndex) {
                setActiveOption(nextIndex)
                if (optionList) {
                    console.log('Scroll to item after arrow navigation')
                    scrollToItem(options[nextIndex], optionList)
                }
            }
        },
        // eslint-disable-next-line
        [setActiveOption, onSelect, onDelete, setIsOpen, cols, isFreeSolo]
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

            if (hasSelectedValue(value) && !isFreeSolo) {
                const lastSelectedValue = getLastSelectedValue(value) as T

                const { lastSelectedOption, lastSelectedOptionIndex } =
                    getLastSelectedOption(getOptionValue(lastSelectedValue), options)

                if (lastSelectedOption && lastSelectedOptionIndex) {
                    setActiveOption(Number(lastSelectedOptionIndex))
                    scrollToItem(lastSelectedOption, optionList)
                    console.log('Scroll to selected item after open menu')
                }
            } else {
                const option = options[activeIndex]
                
                if(option) {
                    setActiveOption(activeIndex)
                    scrollToItem(options[activeIndex], optionList)
                    console.log('Scroll to item after open menu')
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
    }
}
