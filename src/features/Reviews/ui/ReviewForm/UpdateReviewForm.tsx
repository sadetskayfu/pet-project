import { ReactElement } from 'react'
import { ReviewForm } from './ReviewForm'
import { ReviewFormSchema as FormSchema, ReviewFormSchema } from '../../model/ReviewFormSchema'
import { useUpdateReview } from '../../services/useUpdateReview'

interface UpdateReviewForm {
    reviewId: number
    children: ReactElement
    defaultValues: ReviewFormSchema
    onSuccess: () => void
}

const UpdateReviewForm = (props: UpdateReviewForm) => {
    const { reviewId, defaultValues, onSuccess, ...otherProps } = props

    const  {updateReview, error, isPending } = useUpdateReview(onSuccess)

    const handleUpdateReview = (data: FormSchema) => {
        updateReview({id: reviewId, body: data})
    }

    return (
        <ReviewForm
            onSubmit={handleUpdateReview}
            isPending={isPending}
            error={error}
            defaultValues={defaultValues}
            {...otherProps}
        />
    )
}

export default UpdateReviewForm
