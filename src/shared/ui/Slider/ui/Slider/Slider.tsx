import {
	useState,
	useRef,
	useCallback,
	useEffect,
	Suspense,
	memo,
	lazy,
	HTMLAttributes,
} from "react"
import { classNames } from "@/shared/helpers/classNames"
import { useChangeValue, useDragging, useKeyboardNavigation } from "../../hooks"
import { Thumb } from "../Thumb/Thumb"
import { calculateTranslateThumb } from "../../helpers"
import { TooltipWithoutPortalPlacement } from "@/shared/ui/TooltipWithoutPortal"
import { MarkerLabelPlacement } from "../Markers/ui/Marker/Marker"
import { SliderMarker } from "../Markers"
import { Markers } from "../Markers"
import { useTouchDevice } from "@/shared/hooks"
import { useMergeRefs } from "@floating-ui/react"
import { useChangeHoverValue } from "../../hooks/useChangeHoverValue"
import styles from "./style.module.scss"

const HoverTooltip = lazy(() => import("../HoverTooltip/HoverTooltip"))

export type SliderSize = "xs" | "s" | "m"
export type SliderOrientation = "horizontal" | "vertical"
export type SliderColor = "primary" | "light"
export type ValueType = number | [number, number]

export interface SliderProps<V extends number | [number, number]>
	extends Omit<HTMLAttributes<HTMLElement>, 'value' | 'onChange' | 'defaultValue'> {
	className?: string
	size?: SliderSize
	color?: SliderColor
	orientation?: SliderOrientation
	tooltipPlacement?: TooltipWithoutPortalPlacement
	markerLabelPlacement?: MarkerLabelPlacement
	defaultValue?: V
	value?: V
	min: number
	max: number
	step?: number
	minRange?: number
	minInputName?: string
	maxInputName?: string
	disabled?: boolean
	customMarkers?: SliderMarker[]
	tooltip?: boolean
	hoverTooltip?: boolean
	markers?: boolean
	visibleMarkersLabel?: boolean
	onChange?: (value: V extends number ? number : [number, number]) => void
	getMarkerLabel?: (value: number) => string | number
	getTooltipLabel?: (value: number) => string | number
	getAriaValueText?: (value: number) => string
	onDraggingStart?: () => void
	onDraggingEnd?: () => void
}

const SliderComponent = <V extends number | [number, number]>(
	props: SliderProps<V>
) => {
	const {
		className,
		color = "primary",
		size = "m",
		orientation = "horizontal",
		tooltipPlacement = "top",
		markerLabelPlacement = "bottom",
		defaultValue = 0,
		value: controlledValue,
		onChange: controlledOnChange,
		min = 1,
		max = 100,
		step = 1,
		minRange = 1,
		minInputName,
		maxInputName,
		disabled,
		tooltip = true,
		hoverTooltip,
		markers,
		visibleMarkersLabel,
		customMarkers = [],
		getMarkerLabel,
		getTooltipLabel,
		getAriaValueText,
		onDraggingEnd,
		onDraggingStart,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		...otherProps
	} = props

	const [uncontrolledValue, setUncontrolledValue] =
		useState<ValueType>(defaultValue)
	const [hoverValue, setHoverValue] = useState<number>(min)

	const value = controlledValue ?? uncontrolledValue
	const valueRef = useRef<ValueType>(value)

	const onChange = (controlledOnChange ?? setUncontrolledValue) as (
		value: ValueType
	) => void

	const { isTouchDevice } = useTouchDevice()

	const sliderRef = useRef<HTMLDivElement>(null)
	const minThumbRef = useRef<HTMLDivElement>(null)
	const maxThumbRef = useRef<HTMLDivElement>(null)
	const fillRef = useRef<HTMLDivElement>(null)
	const activeThumbIndexRef = useRef<number>(0)
	const isHorizontal = orientation === "horizontal"

	const { handleChangeHoverValue } = useChangeHoverValue({
		min,
		max,
		step,
		orientation,
		sliderRef,
		onChangeHoverValue: setHoverValue,
	})

	const { handleChange } = useChangeValue({
		valueRef,
		sliderRef,
		activeThumbIndexRef,
		minThumbRef,
		maxThumbRef,
		max,
		min,
		minRange,
		step,
		orientation,
		onChange,
	})

	const { isDragging, handleMouseDown } = useDragging({
		minThumbRef,
		maxThumbRef,
		fillRef,
		isTouchDevice,
		handleChange,
		onDraggingStart,
		onDraggingEnd
	})

	const { handleKeyDown } = useKeyboardNavigation({
		valueRef,
		activeThumbIndexRef,
		step,
		max,
		min,
		minRange,
		onChange,
	})

	const handleFocus = useCallback((thumbIndex: number) => {
		activeThumbIndexRef.current = thumbIndex
	}, [])

	const localCalculateTranslateThumb = useCallback(
		(value: number) => {
			return calculateTranslateThumb(value, min, max)
		},
		[min, max]
	)

	useEffect(() => {
		valueRef.current = value
	}, [value])

	const renderThumb = (
		value: number,
		index: number,
		ref: React.RefObject<HTMLDivElement | null>
	) => {
		return (
			<Thumb
				ref={ref}
				orientation={orientation}
				size={size}
				color={color}
				tooltipPlacement={tooltipPlacement}
				disabled={disabled}
				dragging={isDragging && activeThumbIndexRef.current === index}
				tooltip={tooltip}
				index={index}
				value={value}
				max={max}
				min={min}
				name={index === 0 ? minInputName : maxInputName}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				getTooltipLabel={getTooltipLabel}
				getAriaValueText={getAriaValueText}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledby}
			></Thumb>
		)
	}

	const mods: Record<string, boolean | undefined> = {
		[styles["disabled"]]: disabled,
	}

	const additionalClasses: Array<string | undefined> = [
		className,
		styles[size],
		styles[orientation],
		styles[color],
	]

	return (
		<>
			<div
				className={classNames(styles["slider"], additionalClasses, mods)}
				ref={useMergeRefs([sliderRef])}
				onMouseDown={isTouchDevice ? undefined : handleMouseDown}
				onTouchStart={isTouchDevice ? handleMouseDown : undefined}
				onMouseMove={hoverTooltip ? handleChangeHoverValue : undefined}
				{...otherProps}
			>
				<div className={styles["track"]}>
					{typeof value === "number" ? (
						<>
							<div
								className={styles["fill"]}
								style={{
									transitionDuration: "0.2s",
									width: isHorizontal ? `${localCalculateTranslateThumb(value)}%` : "",
									height: !isHorizontal ? `${localCalculateTranslateThumb(value)}%` : "",
								}}
								ref={fillRef}
							></div>
							{markers && (
								<Suspense fallback={null}>
									<Markers
										value={value}
										min={min}
										max={max}
										step={step}
										size={size}
										labelPlacement={markerLabelPlacement}
										orientation={orientation}
										visibleMarkersLabel={visibleMarkersLabel}
										customMarkers={customMarkers}
										getMarkerLabel={getMarkerLabel}
									/>
								</Suspense>
							)}
							{hoverTooltip && (
								<Suspense>
									<HoverTooltip
										className={styles["hover-tooltip"]}
										value={hoverValue}
										min={min}
										max={max}
										orientation={orientation}
										placement={tooltipPlacement}
										getTooltipLabel={getTooltipLabel}
									/>
								</Suspense>
							)}
							{renderThumb(value, 0, minThumbRef)}
						</>
					) : (
						<>
							<div
								className={styles["fill"]}
								style={{
									transitionDuration: "0.2s",
									left: isHorizontal ? `${localCalculateTranslateThumb(value[0])}%` : "",
									bottom: !isHorizontal
										? `${localCalculateTranslateThumb(value[0])}%`
										: "",
									width: isHorizontal
										? `${
												localCalculateTranslateThumb(value[1]) -
												localCalculateTranslateThumb(value[0])
											}%`
										: "",
									height: !isHorizontal
										? `${
												localCalculateTranslateThumb(value[1]) -
												localCalculateTranslateThumb(value[0])
											}%`
										: "",
								}}
								ref={fillRef}
							></div>
							{markers && (
								<Suspense fallback={null}>
									<Markers
										value={value}
										min={min}
										max={max}
										step={step}
										size={size}
										labelPlacement={markerLabelPlacement}
										orientation={orientation}
										visibleMarkersLabel={visibleMarkersLabel}
										customMarkers={customMarkers}
										getMarkerLabel={getMarkerLabel}
									/>
								</Suspense>
							)}
							{hoverTooltip && (
								<Suspense>
									<HoverTooltip
										className={styles["hover-tooltip"]}
										value={hoverValue}
										min={min}
										max={max}
										orientation={orientation}
										placement={tooltipPlacement}
										getTooltipLabel={getTooltipLabel}
									/>
								</Suspense>
							)}
							{renderThumb(value[0], 0, minThumbRef)}
							{renderThumb(value[1], 1, maxThumbRef)}
						</>
					)}
				</div>
			</div>
		</>
	)
}

export const Slider = memo(SliderComponent) as typeof SliderComponent
