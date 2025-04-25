import { Skeleton } from '@/shared/ui/Skeleton'
import { classNames, Mods } from '@/shared/helpers/classNames'
import { AvatarSkeleton } from '@/shared/ui/Avatar'
import styles from './style.module.scss'

export const UserCardSkeleton = ({isComment}: {isComment?: boolean}) => {
    const mods: Mods = {
        [styles['is-comment']]: isComment
    }

    return (
        <div className={classNames(styles['skeleton'], [styles['user-card']], mods)}>
            <AvatarSkeleton borderRadius='circular' size={isComment ? 'm' : 'l'}/>
            <div className={styles['skeleton__user-info']}>
                <Skeleton className={styles['skeleton__text']} borderRadius='m'/>
                <Skeleton className={styles['skeleton__text']} borderRadius='m' />
            </div>
        </div>
    )
}