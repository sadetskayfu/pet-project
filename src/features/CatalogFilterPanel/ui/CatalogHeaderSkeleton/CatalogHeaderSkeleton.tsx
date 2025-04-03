import { Skeleton } from "@/shared/ui/Skeleton"
import styles from './style.module.scss'

export const CatalogHeaderSkeleton = () => {
    return (
        <div className={styles['skeleton']}>
            <Skeleton className={styles['button']}/>
            <Skeleton className={styles['field']}/>
        </div>
    )
}