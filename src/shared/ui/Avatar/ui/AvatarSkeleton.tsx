import { AdditionalClasses, classNames } from "@/shared/helpers/classNames"
import { Skeleton } from "@/shared/ui/Skeleton"
import { AvatarBorderRadius, AvatarSize } from "./Avatar"
import styles from './style.module.scss'

interface AvatarSkeletonProps {
    className?: string
    size: AvatarSize
    borderRadius: AvatarBorderRadius
}

export const AvatarSkeleton = (props: AvatarSkeletonProps) => {
    const { className, size, borderRadius } = props

    const additionalClasses: AdditionalClasses = [
        className,
        styles[`size-${size}`],
        styles[`border-radius-${borderRadius}`]
    ]

    return (
        <Skeleton className={classNames(styles['avatar'], additionalClasses)}/>
    )
}