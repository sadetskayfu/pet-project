import { FormProvider, useForm } from "react-hook-form"
import { reviewFormSchema as formSchema, ReviewFormSchema as FormSchema } from "../../model/ReviewFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFStartRating, RHFTextArea } from "@/shared/ui/RHFControllers"
import { Button } from "@/shared/ui/Button"
import { ReactElement, useId, useState } from "react"
import { Reaction } from "@/shared/ui/Reaction"
import { getReactionValue } from "./getReactionValue"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { CircularProgress } from "@/shared/ui/CircularProgress"
import styles from "./style.module.scss"

interface ReviewFormProps {
	children: ReactElement
	defaultValues?: FormSchema
	error?: Error | null
	isPending?: boolean
	isCreateReview?: boolean
	onSubmit: (data: FormSchema) => void
}

export const ReviewForm = (props: ReviewFormProps) => {
	const { children, defaultValues, isPending, isCreateReview, error, onSubmit } =
		props

	const [hoverRateValue, setHoverRateValue] = useState<number>(
		defaultValues?.rating || 0
	)

	console.log(defaultValues)

	const errorAlertId = useId()

	const methods = useForm<FormSchema>({
		mode: "all",
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			rating: 0,
			message: "",
		},
	})

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={styles["form"]}
				aria-describedby={error ? errorAlertId : undefined}
			>
				<ErrorAlert
					id={errorAlertId}
					error={error}
					message={`Ошибка при оценке фильма`}
				/>
				<div className={styles["rating"]}>
					<Reaction
						className={styles["rating__reaction"]}
						value={getReactionValue(hoverRateValue)}
					/>
					<RHFStartRating<FormSchema>
						hoverValue={hoverRateValue}
						onChangeHoverValue={setHoverRateValue}
						maxStars={5}
						name="rating"
						label="Рейтинг"
						size='m'
						precise
						required
					/>
				</div>
				<RHFTextArea<FormSchema> name="message" label="Ваш отзыв" rows={3} required />
				<div className={styles["actions"]}>
					{children}
					<div style={{ position: "relative" }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							{isCreateReview ? "Оценить" : "Изменить отзыв"}
						</Button>
						{isPending && (
							<CircularProgress
								aria-label={isCreateReview ? "Создание отзыва" : "Изменение отзыва"}
								absCenter
							/>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
