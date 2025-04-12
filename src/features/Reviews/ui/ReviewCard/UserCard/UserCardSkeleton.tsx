import { Skeleton } from '@/shared/ui/Skeleton'
import { classNames, Mods } from '@/shared/helpers/classNames'
import styles from './style.module.scss'

export const UserCardSkeleton = ({isComment}: {isComment?: boolean}) => {
    const mods: Mods = {
        [styles['is-comment']]: isComment
    }

    return (
        <div className={classNames(styles['skeleton'], [styles['user-card']], mods)}>
            <Skeleton borderRadius='circular' className={styles['skeleton__avatar']}/>
            <div className={styles['skeleton__user-info']}>
                <Skeleton className={styles['skeleton__text']} borderRadius='m'/>
                <Skeleton className={styles['skeleton__text']} borderRadius='m' />
            </div>
        </div>
    )
}