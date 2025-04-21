import { ROUTES } from "@/shared/constants/routes"

type LinkType = {
    path: string
    label: string
}

export const links: LinkType[] = [
    {
        path: ROUTES.ADMIN_GENRES,
        label: 'Жанры',
    },
    {
        path: ROUTES.ADMIN_ACTORS,
        label: 'Акторы',
    },
    {
        path: ROUTES.ADMIN_MOVIES,
        label: 'Фильмы'
    }
]