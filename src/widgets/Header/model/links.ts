import { ROUTES } from "@/shared/constants/routes"

type LinkType = {
    path: string
    text: string
}

export const links: LinkType[] = [
    {
        path: ROUTES.HOME,
        text: 'Home'
    },
    {
        path: ROUTES.MOVIES,
        text: 'Movies'
    },
    {
        path: ROUTES.SERIALS,
        text: 'Serials'
    }
]