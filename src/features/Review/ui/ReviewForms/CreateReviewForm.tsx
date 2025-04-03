import { ReactElement } from 'react'
import { ReviewForm } from './ReviewForm'
import { useCreateReview } from '../../services/useCreateReview'
import { FormSchema } from '../../model/FormSchema'

interface CreateReviewForm {
	movieId: number
	movieTitle: string
	children: ReactElement
	onSuccess: () => void
}

const CreateReviewForm = (props: CreateReviewForm) => {
	const { movieId, movieTitle, onSuccess, ...otherProps } = props

	const { createReview, error, isPending } = useCreateReview(movieTitle, onSuccess)

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
