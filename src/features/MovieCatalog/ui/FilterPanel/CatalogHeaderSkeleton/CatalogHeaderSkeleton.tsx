import { Skeleton } from "@/shared/ui/Skeleton"
import styles from './style.module.scss'

export const CatalogHeaderSkeleton = () => {
    return (
        <div className={styles['skeleton']}>
            <Skeleton className={styles['skeleton__button']}/>
            <Skeleton className={styles['skeleton__field']}/>
        </div>
    )
}