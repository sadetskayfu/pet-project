import { lazy } from 'react'

export const DesktopAdminPanelSideBar = lazy(() => import('./AdminPanelSideBar/ui/DesktopAdminPanelSideBar/DesktopAdminPanelSideBar'))
export const MobileAdminPanelSideBar = lazy(() => import('./AdminPanelSideBar/ui/MobileAdminPanelSideBar/MobileAdminPanelSideBar'))
export const AdminGenrePanel = lazy(() => import('./Genres/ui/GenrePanel/GenrePanel'))
export const AdminActorPanel = lazy(() => import('./Actors/ui/ActorPanel/ActorPanel'))
export const AdminMoviePanel = lazy(() => import('./Movies/ui/MoviePanel/MoviePanel'))
export const AdminMainPanel = lazy(() => import('./Main/MainPanel'))
