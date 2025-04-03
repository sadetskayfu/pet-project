import { lazy } from 'react'

export type { SliderMarker } from './ui/Markers'
export type { MarkerLabelPlacement } from './ui/Marker/Marker'

export const Markers = lazy(() => import('./ui/Markers'))
