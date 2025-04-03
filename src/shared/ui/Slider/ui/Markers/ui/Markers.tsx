import {
	checkMarkerOnActive,
	getMarkerPosition,
	getMarkersArray,
} from '../helpers'
import { Marker, MarkerLabelPlacement } from './Marker/Marker'
import { SliderOrientation, SliderSize, ValueType } from '../../Slider/Slider'

export type SliderMarker = {
	value: number
	label: string
}

interface MarkersProps {
	value: ValueType
	step: number
	min: number
	max: number
	customMarkers: SliderMarker[]
	visibleMarkersLabel: boolean | undefined
	orientation: SliderOrientation
	size: SliderSize
	labelPlacement: MarkerLabelPlacement
	getMarkerLabel?: (value: number) => string | number
}

const Markers = (props: MarkersProps) => {
	const {
		value,
		step,
		min,
		max,
		customMarkers,
		visibleMarkersLabel,
		orientation,
		size,
		labelPlacement,
		getMarkerLabel,
	} = props

	const renderMarkers = () => {
		if (customMarkers.length > 0) {
			return customMarkers.map((marker) => {
				const markerValue = marker.value

				const position = getMarkerPosition(markerValue, min, max)
				const isActive = checkMarkerOnActive(markerValue, value)

				return (
					<Marker
						key={markerValue}
						label={marker.label}
						size={size}
						orientation={orientation}
						position={position}
						active={isActive}
						visibleLabel={visibleMarkersLabel}
						labelPlacement={labelPlacement}
					/>
				)
			})
		} else {
			const markersArray = getMarkersArray(min, max, step)

			return markersArray.map((markerValue) => {
				const position = getMarkerPosition(markerValue, min, max)
				const isActive = checkMarkerOnActive(markerValue, value)

				return (
					<Marker
						key={markerValue}
						label={getMarkerLabel ? getMarkerLabel(markerValue) : markerValue + ''}
						size={size}
						orientation={orientation}
						position={position}
						active={isActive}
						visibleLabel={visibleMarkersLabel}
						labelPlacement={labelPlacement}
					/>
				)
			})
		}
	}

	return <>{renderMarkers()}</>
}

export default Markers