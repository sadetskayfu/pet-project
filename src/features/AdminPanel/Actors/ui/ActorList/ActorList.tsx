import { ActorCard } from '../ActorCard/ActorCard'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { actorApi } from '@/entities/actors'
import { Alert } from '@/shared/ui/Alert'
import { XMark } from '@/shared/assets/icons'
import { getErrorMessage } from '@/shared/helpers/getErrorMessage'
import { Typography } from '@/shared/ui/Typography'
import { useDeleteActor } from '../../model/useDeleteActor'
import { queryClient } from '@/shared/api'
import { PaginationCursor } from '@/shared/ui/PaginationCursor'
import { Skeletons } from '@/shared/ui/Skeleton'
import { ActorCardSkeleton } from '@/shared/ui/ActorCard'
import { FormSchema } from '../../model/FormSchema'
import { UpdateActorDialog } from '../ActorDialogs/UpdateActorDialog'
import { ConfirmationDeleteDialog } from '@/widgets/ConfirmationDeleteDialog'
import styles from './style.module.scss'

export const ActorList = memo(({ searchValue }: { searchValue: string }) => {
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
	const [mutationActorId, setMutationActorId] = useState<number>(-1)
	const [mutationActorData, setMutationActorData] = useState<FormSchema>({
		firstName: '',
		lastName: '',
		birthDate: '',
		photoUrl: '',
	})

	const editButtonRef = useRef<HTMLButtonElement | null>(null)
	const deleteButtonRef = useRef<HTMLButtonElement | null>(null)

	const query = useInfiniteQuery({
		...actorApi.getActorsInfinityQueryOptions({ name: searchValue }),
	})

	const {
		data: actors,
		isLoading,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = query

	const { deleteActor, isPending: isPendingDelete } = useDeleteActor()

	const startEdit = useCallback(
		(
			actorId: number,
			actorData: FormSchema,
			buttonRef: React.RefObject<HTMLButtonElement>
		) => {
			editButtonRef.current = buttonRef.current
			setMutationActorId(actorId)
			setMutationActorData(actorData)
			setIsOpenUpdateDialog(true)
		},
		[]
	)

	const startDelete = useCallback(
		(
			actorId: number,
			actorData: FormSchema,
			buttonRef: React.RefObject<HTMLButtonElement>
		) => {
			deleteButtonRef.current = buttonRef.current
			setMutationActorId(actorId)
			setMutationActorData(actorData)
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	const renderActorCards = useMemo(
		() =>
			actors?.map((actor) => (
				<li key={actor.id}>
					<ActorCard
						onEdit={startEdit}
						onDelete={startDelete}
						fullWidth
						{...actor}
					/>
				</li>
			)),
		[actors, startDelete, startEdit]
	)

	useEffect(() => {
		return () => {
			queryClient.removeQueries({
				queryKey: [actorApi.baseKey],
			})
		}
	}, [])

	if (error) {
		return (
			<Alert
				variant="outlined"
				severity="error"
				icon={<XMark size="m" variant="outlined" />}
			>
				{getErrorMessage(error, 'Error while getting actors. Try reload page')}
			</Alert>
		)
	}

	return (
		<>
			{isLoading ? (
				<Skeletons count={15} withContainer className={styles['list']}>
					<ActorCardSkeleton fullWidth />
				</Skeletons>
			) : renderActorCards && renderActorCards.length > 0 ? (
				<>
					<ul className={styles['list']}>{renderActorCards}</ul>
					<PaginationCursor
						onFetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						loading={isFetchingNextPage}
					/>
				</>
			) : (
				<Typography component='p' textAlign="center" color="soft" size="default">
					No actors were found for your search. Enter a different value, or create
					your first actor.
				</Typography>
			)}
			<UpdateActorDialog
				defaultFormValues={mutationActorData}
				returnFocus={editButtonRef}
				actorId={mutationActorId}
				open={isOpenUpdateDialog}
				setOpen={setIsOpenUpdateDialog}
			/>
			<ConfirmationDeleteDialog
				open={isOpenDeleteDialog}
				setOpen={setIsOpenDeleteDialog}
				onDelete={() => deleteActor(mutationActorId)}
				loading={isPendingDelete}
				returnFocus={deleteButtonRef}
				title={`Do you really want to delete actor "${mutationActorData.firstName} ${mutationActorData.lastName}"`}
			/>
		</>
	)
})
