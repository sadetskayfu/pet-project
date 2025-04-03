import { ReactElement } from 'react'
import { ReviewForm } from './ReviewForm'
import { FormSchema } from '../../model/FormSchema'
import { useUpdateReview } from '../../services/useUpdateReview'

interface UpdateReviewForm {
    movieTitle: string
    reviewId: number
    children: ReactElement
    onSuccess: () => void
}

const UpdateReviewForm = (props: UpdateReviewForm) => {
    const { reviewId, movieTitle, onSuccess, ...otherProps } = props

    const  {updateReview, error, isPending } = useUpdateReview(movieTitle, onSuccess)

    const handleUpdateReview = (data: FormSchema) => {
        updateReview({id: reviewId, body: data})
    }

    return (
        <ReviewForm
            onSubmit={handleUpdateReview}
            isPending={isPending}
            error={error}
            {...otherProps}
        />
    )
}

export default UpdateReviewForm
