import { ROUTES } from "@/shared/constants/routes"
import { memo } from "react"
import { Link } from "react-router-dom"
import styles from './style.module.scss'

export const Logo = memo(() => {
    return (
        <Link to={ROUTES.HOME} className={styles['logo']}>
                Logo
        </Link>
    )
})