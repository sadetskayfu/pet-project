import { lazy } from 'react'
import TooltipWithoutPortal from './ui/TooltipWithoutPortal'

export {
	type TooltipWithoutPortalBorderRadius,
	type TooltipWithoutPortalPlacement,
} from './ui/TooltipWithoutPortal'

export const TooltipWithoutPortalLazy = lazy(
	() => import('./ui/TooltipWithoutPortal')
)
export { TooltipWithoutPortal }
