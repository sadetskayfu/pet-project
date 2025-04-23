import { AuthPage } from "@/pages/AuthPage"
import { HomePage } from "@/pages/HomePage"
import { MoviesPage } from "@/pages/MoviesPage"
import { ROUTES } from "@/shared/constants/routes"
import { createBrowserRouter } from "react-router-dom"
import { ProfilePage } from "@/pages/ProfilePage"
import { AdminPage } from "@/pages/AdminPage"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { MainLayout } from "./MainLayout/MainLayout"
import { AuthLayout } from "./AuthLayout/AuthLayout"
import {
	AdminActorPanel,
	AdminGenrePanel,
	AdminMainPanel,
	AdminMoviePanel,
} from "@/features/AdminPanel"
import { MoviePage } from "@/pages/MoviePage"
import { ProtectedRoute } from "./ProtectedRoute"
import { NotFoundPage } from "@/pages/NotFoundPage"

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: ROUTES.HOME,
				element: <HomePage />,
			},
			{
				path: ROUTES.CATALOG,
				element: <MoviesPage />,
			},
			{
				path: `${ROUTES.CATALOG}/:movieId`,
				element: <MoviePage />,
			},
			{
				path: `${ROUTES.PROFILE}/:userId`,
				element: <ProfilePage />,
			},
			{
				path: ROUTES.FORBIDDEN,
				element: <ForbiddenPage />,
			},
			{
				path: ROUTES.ADMIN,
				element: (
					<ProtectedRoute roles={["admin"]}>
						<AdminPage />
					</ProtectedRoute>
				),
				children: [
					{ path: "", element: <AdminMainPanel /> },
					{
						path: "genres",
						element: <AdminGenrePanel />,
					},
					{
						path: "actors",
						element: <AdminActorPanel />,
					},
					{
						path: "movies",
						element: <AdminMoviePanel />,
					},
				],
			},
			{
				path: "*",
				element: <NotFoundPage />,
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
