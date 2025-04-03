import { lazy } from 'react'

export { AdminPanelSideBar } from './AdminPanelSideBar/AdminPanelSideBar'

export const GenrePanel = lazy(() => import('./Genres/ui/GenrePanel/GenrePanel'))
export const ActorPanel = lazy(() => import('./Actors/ui/ActorPanel/ActorPanel'))
export const MoviePanel = lazy(() => import('./Movies/ui/MoviePanel/MoviePanel'))
