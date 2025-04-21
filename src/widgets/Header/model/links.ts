import { ROUTES } from "@/shared/constants/routes"

type LinkType = {
    path: string
    text: string
}

export const links: LinkType[] = [
    {
        path: ROUTES.HOME,
        text: 'Главная'
    },
    {
        path: ROUTES.CATALOG,
        text: 'Каталог'
    },
]