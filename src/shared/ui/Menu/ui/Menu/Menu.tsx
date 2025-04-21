import {
	autoUpdate,
	flip,
	FloatingFocusManager,
	FloatingList,
	FloatingNode,
	FloatingPortal,
	FloatingTree,
	offset,
	Placement,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFloatingNodeId,
	useFloatingParentNodeId,
	useFloatingTree,
	useHover,
	useInteractions,
	useListItem,
	useListNavigation,
	useMergeRefs,
	useRole,
	useTransitionStatus,
	useTypeahead,
} from '@floating-ui/react'
import { cloneElement, ReactElement, useEffect, useRef, useState } from 'react'
import { useMenuContext } from '../../model/useMenuContext'
import { MenuContext } from '../../model/MenuContext'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { useTouchDevice } from '@/shared/hooks'
import styles from './style.module.scss'

type MenuOpenVariant = 'click' | 'hover'

interface MenuProps {
	className?: string
	trigger: ReactElement
	children?: React.ReactNode
	placementRoot?: Placement
	placementNested?: Placement
	openVariant?: MenuOpenVariant
	delay?: number | Partial<{ open: number; close: number }>
	padding?: number
	offset?: number
	flipPadding?: number
	style?: React.CSSProperties
}

export const MenuComponent = (props: MenuProps) => {
	const {
		className,
		trigger,
		children,
		placementRoot = 'bottom-start',
		placementNested = 'right-start',
		openVariant = 'click',
		delay = 0,
		padding = 5,
		offset: offsetValue = 5,
		flipPadding = 5,
		style,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const elementsRef = useRef<
		Array<HTMLButtonElement | HTMLAnchorElement | null>
	>([])
	const labelsRef = useRef<Array<string | null>>([])

	const { isTouchDevice } = useTouchDevice()
	const parent = useMenuContext()

	const tree = useFloatingTree()
	const nodeId = useFloatingNodeId()
	const parentId = useFloatingParentNodeId()
	const item = useListItem()

	const isNested = parentId != null

	const { floatingStyles, refs, context } = useFloating({
		nodeId,
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: isNested ? placementNested : placementRoot,
		middleware: [
			offset({
				mainAxis: isNested ? padding : offsetValue,
				alignmentAxis: isNested ? -padding : 0,
			}),
			flip({ padding: flipPadding }),
			shift({ padding: flipPadding }),
		],
		whileElementsMounted: autoUpdate,
	})

	const hover = useHover(context, {
		enabled: !isTouchDevice && (openVariant === 'hover' || isNested),
		handleClose: safePolygon(),
		delay: isNested ? 0 : delay,
	})
	const click = useClick(context, {
		event: 'mousedown',
		ignoreMouse: isNested || openVariant === 'hover',
	})
	const role = useRole(context, { role: 'menu' })
	const dismiss = useDismiss(context, { bubbles: true })
	const listNavigation = useListNavigation(context, {
		listRef: elementsRef,
		activeIndex,
		nested: isNested,
		onNavigate: setActiveIndex,
		loop: true,
	})
	const typeahead = useTypeahead(context, {
		listRef: labelsRef,
		onMatch: isOpen ? setActiveIndex : undefined,
		activeIndex,
		enabled: !isTouchDevice
	})

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
		hover,
		click,
		role,
		dismiss,
		listNavigation,
		typeahead,
	])

	const { isMounted, status } = useTransitionStatus(context, {
		duration: 200,
	})

	const mods: Mods = {
		[styles['open']]: status === 'open',
		[styles['close']]: status === 'close',
		[styles['root-menu']]: !isNested,
	}

	useEffect(() => {
		if (!tree) return

		function handleTreeClick() {
			setIsOpen(false)
		}

		function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
			if (event.nodeId !== nodeId && event.parentId === parentId) {
				setIsOpen(false)
			}
		}

		tree.events.on('click', handleTreeClick)
		tree.events.on('menuopen', onSubMenuOpen)

		return () => {
			tree.events.off('click', handleTreeClick)
			tree.events.off('menuopen', onSubMenuOpen)
		}
	}, [tree, nodeId, parentId])

	useEffect(() => {
		if (isOpen && tree) {
			tree.events.emit('menuopen', { parentId, nodeId })
		}
	}, [tree, isOpen, nodeId, parentId])

	useEffect(() => {
		if(!isNested && status === 'close') {
			const referenceEl = refs.reference.current as HTMLElement | null
			referenceEl?.focus()
		}
	}, [status, isNested, refs.reference])

	const menuTriggerProps = {
		ref: useMergeRefs([refs.setReference, item.ref, (trigger as any).ref]),
		'data-open': isOpen ? '' : undefined,
		...getReferenceProps(
			parent.getItemProps({
				onFocus(event: React.FocusEvent<HTMLElement>) {
					trigger.props.onFocus?.(event)
				},
			})
		),
	}

	return (
		<FloatingNode id={nodeId}>
			{cloneElement(trigger, menuTriggerProps)}
			<MenuContext.Provider
				value={{
					activeIndex,
					getItemProps,
				}}
			>
				<FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
					{isMounted && (
						<FloatingPortal>
							<FloatingFocusManager
								context={context}
								modal={false}
								initialFocus={isNested ? -1 : 0}
								returnFocus={false}
							>
								<div role="presentation" ref={refs.setFloating} style={{...floatingStyles, zIndex: 1500}}>
									<ul
										{...getFloatingProps()}
										className={classNames(styles['menu'], [className], mods)}
										style={{ ...style, padding }}
									>
										{children}
									</ul>
								</div>
							</FloatingFocusManager>
						</FloatingPortal>
					)}
				</FloatingList>
			</MenuContext.Provider>
		</FloatingNode>
	)
}

export const Menu = (props: MenuProps) => {
	const parentId = useFloatingParentNodeId()

	if (parentId === null) {
		return (
			<FloatingTree>
				<MenuComponent {...props} />
			</FloatingTree>
		)
	}

	return <MenuComponent {...props} />
}
