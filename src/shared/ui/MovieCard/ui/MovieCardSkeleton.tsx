import { Skeleton } from "@/shared/ui/Skeleton"
import styles from './style.module.scss'

export const MovieCardSkeleton = () => {
    return (
        <div className={styles['skeleton']}>
            <Skeleton className={styles['skeleton__image']}/>
            <Skeleton className={styles['skeleton__description']}/>
        </div>
    )
}