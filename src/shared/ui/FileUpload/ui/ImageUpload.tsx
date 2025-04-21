import { mergeEventHandlers } from "@/shared/helpers/mergeEventHandlers"
import {
	ButtonHTMLAttributes,
	cloneElement,
	memo,
	useCallback,
	useRef,
} from "react"

interface ImageUploadProps {
	children: React.ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
	onChange: (file: File | null) => void
}

export const ImageUpload = memo((props: ImageUploadProps) => {
	const { children, onChange } = props

	const inputRef = useRef<HTMLInputElement>(null)

	const handleChildrenClick = useCallback(() => {
		if (inputRef.current) inputRef.current.click()
	}, [])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file && file.type.includes("image")) {
			onChange(file)
		} else {
			onChange(null)
			console.error("Пожалуйста, выберите изображение (PNG, JPEG)")
		}
	}

	return (
		<>
			{cloneElement(children, {
				onClick: mergeEventHandlers([handleChildrenClick, children.props.onClick]),
			})}
			<input
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				onChange={handleChange}
				ref={inputRef}
				style={{ display: "none" }}
			/>
		</>
	)
})
