import { memo } from "react"
import styles from './style.module.scss'

export const Logo = memo(() => {
    return (
        <span className={styles['logo']}>
                Y
        </span>
    )
})