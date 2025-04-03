import { mergeEventHandlers } from '@/shared/helpers/mergeEventHandlers'
import { cloneElement, useRef } from 'react'

interface ImageUploadProps {
  children: React.ReactElement
	onChange: (string: string | null) => void
}

export const ImageUpload = (props: ImageUploadProps) => {
	const { children, onChange } = props

	const inputRef = useRef<HTMLInputElement>(null)

	const handleChildrenClick = () => {
		if (inputRef.current) inputRef.current.click()
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files
    
		if (fileList) {
			const filesArray = Array.from(fileList)

			filesArray.forEach((file) => {
				const reader = new FileReader()

				reader.onload = function (event) {
					if (event.target?.result) {
						const data = event.target.result as string
						onChange(data)
					}
				}

				reader.onerror = function (error) {
					console.error('Error reading file:', error)
				}

				reader.readAsDataURL(file)
			})
		}
	}

	return (
		<>
			{cloneElement(children, {
				onClick: mergeEventHandlers(handleChildrenClick, children.props.onClick),
			})}
			<input
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				onChange={handleChange}
				ref={inputRef}
				style={{ display: 'none' }}
			/>
		</>
	)
}
