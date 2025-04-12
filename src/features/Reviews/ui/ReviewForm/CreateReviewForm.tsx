import { ReactElement } from 'react'
import { ReviewForm } from './ReviewForm'
import { useCreateReview } from '../../services/useCreateReview'
import { ReviewFormSchema as FormSchema } from '../../model/ReviewFormSchema'

interface CreateReviewForm {
	movieId: number
	children: ReactElement
	onSuccess: () => void
}

const CreateReviewForm = (props: CreateReviewForm) => {
	const { movieId, onSuccess, ...otherProps } = props

	const { createReview, error, isPending } = useCreateReview(onSuccess)

	const handleCreateReview = (data: FormSchema) => {
		createReview({ ...data, movieId })
	}

	return (
		<ReviewForm
			onSubmit={handleCreateReview}
			isPending={isPending}
			error={error}
			isCreateReview
			{...otherProps}
		/>
	)
}

export default CreateReviewForm
