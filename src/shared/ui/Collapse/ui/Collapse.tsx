import { ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react'
import { CollapseContext, ContextType } from '../model/CollapseContext'

interface CollapseProps {
	children: ReactNode
	initialOpen?: boolean
	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	disabledClick?: boolean
	lazy?: boolean
	unmount?: boolean
}

export const Collapse = (props: CollapseProps) => {
	const { initialOpen = false, open: controlledOpen, setOpen: setControlledOpen, lazy = false, unmount = false, disabledClick = false, children } =
		props

	const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen)

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const id = useId()
	const labelId = id + 'label'
	const bodyId = id + 'body'

	const isMountedRef = useRef<boolean>(false)
	const bodyRef = useRef<HTMLDivElement>(null)
	const autoHeighTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)
	const closeTimeoutIdRef = useRef<NodeJS.Timeout | null>(null)

	// Open
	useEffect(() => {
		const body = bodyRef.current

		if (!body || !open) return

		if (closeTimeoutIdRef.current) {
			clearTimeout(closeTimeoutIdRef.current)
		}

		const contentHeight = body.scrollHeight

		body.style.height = contentHeight + 'px'

		autoHeighTimeoutIdRef.current = setTimeout(() => {
			body.style.height = 'auto'
		}, 300)
	}, [open])

	// Close
	useEffect(() => {
		const body = bodyRef.current

		if (!body || open || !isMountedRef.current) return

		const contentHeight = body.scrollHeight

		if (autoHeighTimeoutIdRef.current) {
			clearTimeout(autoHeighTimeoutIdRef.current)
		}

		body.style.height = contentHeight + 'px'

		closeTimeoutIdRef.current = setTimeout(() => {
			body.style.height = '0px'
		}, 50)
	}, [open])

	useEffect(() => {
		return () => {
			if (autoHeighTimeoutIdRef.current) {
				clearTimeout(autoHeighTimeoutIdRef.current)
			}
			if (closeTimeoutIdRef.current) {
				clearTimeout(closeTimeoutIdRef.current)
			}
		}
	}, [])

	useEffect(() => {
		isMountedRef.current = true
	}, [])

	const contextValue: ContextType = useMemo(() => ({
		open,
		setOpen,
		bodyRef,
		bodyId,
		labelId,
		lazy,
		unmount,
		disabledClick
	}), [open, setOpen, bodyId, labelId, lazy, unmount, disabledClick])

	return (
		<CollapseContext.Provider value={contextValue}>
			{children}
		</CollapseContext.Provider>
	)
}
