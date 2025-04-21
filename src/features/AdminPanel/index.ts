import { lazy } from 'react'

export const DesktopAdminPanelSideBar = lazy(() => import('./AdminPanelSideBar/ui/DesktopAdminPanelSideBar/DesktopAdminPanelSideBar'))
export const MobileAdminPanelSideBar = lazy(() => import('./AdminPanelSideBar/ui/MobileAdminPanelSideBar/MobileAdminPanelSideBar'))
export const GenrePanel = lazy(() => import('./Genres/ui/GenrePanel/GenrePanel'))
export const ActorPanel = lazy(() => import('./Actors/ui/ActorPanel/ActorPanel'))
export const MoviePanel = lazy(() => import('./Movies/ui/MoviePanel/MoviePanel'))
