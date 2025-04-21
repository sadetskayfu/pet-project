import { classNames } from '@/shared/helpers/classNames'
import { Skeleton, Skeletons } from '@/shared/ui/Skeleton'
import styles from './style.module.scss'

export const UpdateProfileUserInfoFormSkeleton = () => {
    return (
        <div className={classNames(styles['skeleton'], [styles['update-profile-form']])}>
            <Skeletons count={4} withContainer className={styles['fields']}>
                <Skeleton className={styles['skeleton__field']}/>
            </Skeletons>
            <Skeletons withContainer count={2} className={styles['skeleton__toggle-button-group']}>
                <Skeleton className={styles['skeleton__toggle-button']}/>
            </Skeletons>
            <Skeletons count={2} withContainer className={styles['buttons']}>
                <Skeleton className={styles['skeleton__button']}/>
            </Skeletons>
        </div>
    )
}