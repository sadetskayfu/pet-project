//import { ROUTES } from "@/shared/constants/routes"

import { ROUTES } from "@/shared/constants/routes"

type LinkType = {
    path: string
    label: string
}

export const links: LinkType[] = [
    {
        path: ROUTES.ADMIN_GENRES,
        label: 'Genres',
    },
    {
        path: ROUTES.ADMIN_ACTORS,
        label: 'Actors',
    },
    {
        path: ROUTES.ADMIN_MOVIES,
        label: 'Movies'
    }
]