import { FormProvider, useForm } from "react-hook-form"
import { formSchema, FormSchema } from "../../model/FormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFStartRating, RHFTextArea } from "@/shared/ui/RHFControllers"
import { Button } from "@/shared/ui/Button"
import { ReactElement, useId, useState } from "react"
import { Reaction } from "@/shared/ui/Reaction"
import { getReactionValue } from "../../helpers/getReactionValue"
import { useWindowWidth } from "@/shared/hooks"
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

	const errorAlertId = useId()

	const { windowWidth } = useWindowWidth()

	const methods = useForm<FormSchema>({
		mode: "all",
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues ?? {
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
					message={`Error while ${isCreateReview ? "creating" : "updating"} review`}
				/>
				<div className={styles["rating"]}>
					<Reaction
						className={styles["rating__reaction"]}
						value={getReactionValue(hoverRateValue)}
					/>
					<RHFStartRating<FormSchema>
						hoverValue={hoverRateValue}
						onChangeHoverValue={setHoverRateValue}
						maxStars={10}
						name="rating"
						label="Rating"
						size={windowWidth > 500 ? "m" : "s"}
						precise
						required
					/>
				</div>
				<RHFTextArea<FormSchema> name="message" label="Review" rows={3} required />
				<div className={styles["actions"]}>
					{children}
					<div style={{ position: "relative" }}>
						<Button
							disabled={!methods.formState.isValid || isPending}
							color="primary"
							type="submit"
						>
							{isCreateReview ? "Rate movie" : "Change review"}
						</Button>
						{isPending && (
							<CircularProgress
								aria-label={isCreateReview ? "Creating review" : "Updating review"}
								absCenter
							/>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
