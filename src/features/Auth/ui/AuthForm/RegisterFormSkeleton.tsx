import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import { FieldSkeleton } from '@/shared/ui/Field'
import styles from './style.module.scss'

export const RegisterFormSkeleton = () => {
    return (
        <div className={styles['form']}>
            <Skeletons count={4}>
                <FieldSkeleton withLabel />
            </Skeletons>
            <Skeleton className={styles['skeleton-button']}/>
        </div>
    )
}