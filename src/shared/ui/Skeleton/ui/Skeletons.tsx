import { Fragment, ReactElement } from 'react'

interface SkeletonsProps {
    className?: string
	children: ReactElement
	count: number
    withContainer?: boolean
}

export const Skeletons = (props: SkeletonsProps) => {
    const { className, children, count, withContainer } = props

    const array = Array.from({length: count}, (_, index) => index)

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
