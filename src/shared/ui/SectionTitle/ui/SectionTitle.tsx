import { memo } from "react"
import { classNames } from "@/shared/helpers/classNames"
import styles from './style.module.scss'

interface SectionTitleProps {
    className?: string
    id?: string
    label: string
}

export const SectionTitle = memo((props: SectionTitleProps) => {
    const { className, id, label } = props

    return (
        <h2 id={id} className={classNames(styles['section-title'], [className])}>
            {label}
        </h2>
    )
})