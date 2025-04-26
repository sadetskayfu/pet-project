import { ActorCard } from "../ActorCard/ActorCard"
import { memo, useCallback, useRef, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { actorApi } from "@/entities/actors"
import { Typography } from "@/shared/ui/Typography"
import { useDeleteActor } from "../../services/useDeleteActor"
import { PaginationCursor } from "@/shared/ui/PaginationCursor"
import { Skeletons } from "@/shared/ui/Skeleton"
import { ActorCardSkeleton } from "@/shared/ui/ActorCard"
import { FormSchema } from "../../model/FormSchema"
import { UpdateActorDialog } from "../ActorDialogs/UpdateActorDialog"
import { ConfirmationDeleteDialog } from "@/widgets/ConfirmationDeleteDialog"
import { ErrorAlert } from "@/widgets/ErrorAlert"
import { VirtuosoGrid } from "react-virtuoso"
import styles from "./style.module.scss"

export const ActorList = memo(({ searchValue }: { searchValue: string }) => {
	const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false)
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
	const [mutationActorId, setMutationActorId] = useState<number>(-1)
	const [mutationActorData, setMutationActorData] = useState<FormSchema>({
		firstName: "",
		lastName: "",
		birthDate: "",
		photoUrl: "",
	})

	const editButtonRef = useRef<HTMLButtonElement | null>(null)
	const deleteButtonRef = useRef<HTMLButtonElement | null>(null)

	const query = useInfiniteQuery({
		...actorApi.getActorsInfinityQueryOptions({ name: searchValue }),
	})

	const {
		data: actors,
		isLoading,
		isRefetching,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = query

	const handleCloseDeleteDialog = useCallback(() => {
		setIsOpenDeleteDialog(false)
	}, [])

	const { deleteActor, isPending: isPendingDelete } = useDeleteActor(handleCloseDeleteDialog)

	const startEdit = useCallback(
		(
			actorId: number,
			actorData: FormSchema,
			buttonRef: React.RefObject<HTMLButtonElement | null>
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
			buttonRef: React.RefObject<HTMLButtonElement | null>
		) => {
			deleteButtonRef.current = buttonRef.current
			setMutationActorId(actorId)
			setMutationActorData(actorData)
			setIsOpenDeleteDialog(true)
		},
		[]
	)

	return (
		<div className={styles['actor-list']}>
			{error ? (
				<ErrorAlert error={error} message="Не удалось получить актеров" />
			) : (isLoading || isRefetching) ? (
				<Skeletons count={15} withContainer className={styles["item-list"]}>
					<ActorCardSkeleton />
				</Skeletons>
			) : actors && actors.length > 0 ? (
					<VirtuosoGrid
						listClassName={styles['item-list']}
						itemClassName={styles['item']}
						useWindowScroll
						data={actors}
						totalCount={actors.length}
						endReached={() => {
							if (hasNextPage && !isFetchingNextPage) {
							  fetchNextPage();
							}
						  }}
						components={{
							Footer: () => <PaginationCursor loading={isFetchingNextPage} hasNextPage={hasNextPage} />
						}}
						itemContent={(_, actor) => <ActorCard onEdit={startEdit} onDelete={startDelete} {...actor}/>}
					/>
			) : (
				<Typography component="p" textAlign="center" color="soft" size="default">
					По вашим критериям не найдено ниодного актера.
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
				title={`Вы действительно хотите удалить актера "${mutationActorData.firstName} ${mutationActorData.lastName}?"`}
			/>
		</div>
	)
})
