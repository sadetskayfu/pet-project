import { TagField, TagFieldProps } from '@/shared/ui/TagField'
import { ConfirmationDeleteDialog } from '@/widgets/ConfirmationDeleteDialog'
import { memo, useState } from 'react'

export const GenreCard = memo((props: TagFieldProps) => {
	const { onDelete, defaultValue, id, ...otherProps } = props

	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

	return (
		<>
			<TagField
				onDelete={() => setIsOpenDialog(true)}
				id={id}
				defaultValue={defaultValue}
				{...otherProps}
			/>
			<ConfirmationDeleteDialog
				title={`Do you really want to remove the '${defaultValue}' genre?`}
				open={isOpenDialog}
				setOpen={setIsOpenDialog}
				onDelete={() => onDelete(id)}
			/>
		</>
	)
})
