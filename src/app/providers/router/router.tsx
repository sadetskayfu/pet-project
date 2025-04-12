import { AuthPage } from '@/pages/AuthPage'
import { HomePage } from '@/pages/HomePage'
import { MoviesPage } from '@/pages/MoviesPage'
import { ROUTES } from '@/shared/constants/routes'
import { createBrowserRouter } from 'react-router-dom'
import { ProfilePage } from '@/pages/ProfilePage'
import { AdminPage } from '@/pages/AdminPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { MainLayout } from './MainLayout/MainLayout'
import { AuthLayout } from './AuthLayout/AuthLayout'
import { ActorPanel, GenrePanel, MoviePanel } from '@/features/adminPanel'
import { MoviePage } from '@/pages/MoviePage'
import { UserProfilePage } from '@/pages/UserProfilePage'

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: ROUTES.HOME,
				element: <HomePage />,
			},
			{
				path: ROUTES.MOVIES,
				element: <MoviesPage />,
			},
			{
				path: `${ROUTES.MOVIES}/:movieId`,
				element: <MoviePage />,
			},
			{
				path: `${ROUTES.PROFILE}/:userId`,
				element: (
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				),
			},
			{
				path: `${ROUTES.USER_PROFILE}/:userId`,
				element: (
						<UserProfilePage />
				),
			},
			{
				path: ROUTES.FORBIDDEN,
				element: <ForbiddenPage />,
			},
			{
				path: ROUTES.ADMIN,
				element: <AdminPage />,
				children: [
					{
						path: 'genres',
						element: <GenrePanel />,
					},
					{
						path: 'actors',
						element: <ActorPanel />,
					},
					{
						path: 'movies',
						element: <MoviePanel />,
					},
				],
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.AUTH,
				element: <AuthPage />,
			},
		],
	},
])
