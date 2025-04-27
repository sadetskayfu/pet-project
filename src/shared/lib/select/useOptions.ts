import { useEffect, useRef, useState } from 'react'

type UseOptionProps = {
	optionListRef: React.MutableRefObject<HTMLUListElement | null>
	isMounted: boolean
	isLoading: boolean | undefined
}

export const useOptions = (props: UseOptionProps) => {
	const { optionListRef, isMounted, isLoading } = props

	const optionsRef = useRef<HTMLLIElement[]>([])
	const [isOptionsReady, setIsOptionsReady] = useState<boolean>(false)

	useEffect(() => {
		if(!isMounted) {
			setIsOptionsReady(false)
		}
	}, [isMounted])

	useEffect(() => {
		const optionList = optionListRef.current

		if (!optionList || !isMounted || isLoading) return

		const updateOptions = () => {
			const options = optionList.querySelectorAll<HTMLLIElement>("[role='option']")

			options.forEach((option, index) => {
				option.setAttribute('data-index', index + '')
			})

			optionsRef.current = Array.from(options)

			setIsOptionsReady(true)
		}

		const observer = new MutationObserver(updateOptions)

		observer.observe(optionList, {
			childList: true,
		})

		updateOptions()

		return () => {
			observer.disconnect()
		}
	}, [isMounted, isLoading, optionListRef])

	return { optionsRef, isOptionsReady }
}
