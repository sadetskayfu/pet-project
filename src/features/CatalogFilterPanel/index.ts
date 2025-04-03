import { lazy } from 'react'

export {
	type FormSchema as CatalogFilterFormSchema,
	formSchema as catalogFilterFormSchema,
} from './model/FormSchema'
export { CatalogHeaderSkeleton } from './ui/CatalogHeaderSkeleton/CatalogHeaderSkeleton'

export const MobileCatalogFilterPanel = lazy(
	() => import('./ui/MobileCatalogFilterPanel/MobileCatalogFilterPanel')
)

export const DesktopCatalogFilterPanel = lazy(
	() => import('./ui/DesktopCatalogFilterPanel/DesktopCatalogFilterPanel')
)


