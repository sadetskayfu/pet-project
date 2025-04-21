import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import { classNames } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const ActorFormSkeleton = () => {
    return (
        <div className={classNames(styles['skeleton'], [styles['form']])}>
            <Skeletons count={4}>
                <Skeleton className={styles['skeleton__field']}/>
            </Skeletons>
            <div className={styles['actions']}>
                <Skeletons count={2}>
                    <Skeleton className={styles['skeleton__action']} />
                </Skeletons>
            </div>
        </div>
    )
}