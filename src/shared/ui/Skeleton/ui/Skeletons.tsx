import { Fragment, ReactElement } from 'react'

interface SkeletonsProps {
    className?: string
	children: ReactElement
	count: number
    min?: number
    max?: number
    withContainer?: boolean
}

export const Skeletons = (props: SkeletonsProps) => {
    const { className, children, count, min, max, withContainer } = props

    const countWithRange = min && max ? Math.max(min, Math.min(count, max)) : count

    const array = Array.from({length: countWithRange}, (_, index) => index)

    const renderSkeletons = () => array.map((index) => <Fragment key={index}>{children}</Fragment>)

	if(withContainer) {
        return (
            <div className={className}>
                {renderSkeletons()}
            </div>
        )
    }

    return renderSkeletons()
}
