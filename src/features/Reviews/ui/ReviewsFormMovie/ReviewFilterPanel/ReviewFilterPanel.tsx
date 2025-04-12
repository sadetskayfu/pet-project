import { ToggleButtonGroup } from "@/shared/ui/ToggleButtonGroup"
import { ToggleButton } from "@/shared/ui/ToggleButton"
import { useCallback, useMemo } from "react"
import { Composite, CompositeItem } from "@floating-ui/react"
import { Select } from "@/shared/ui/Select"
import { OptionItem } from "@/shared/ui/OptionItem"
import { ReviewFilterValue, ReviewSortValue } from "@/entities/reviews"
import { useSelector } from "react-redux"
import { userSelectors } from "@/entities/user"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { Chat, Dislike, Heart } from "@/shared/assets/icons"
import styles from "./style.module.scss"

type FilterOption = {
	value: ReviewFilterValue
	label: string
}

type SortOption = {
	value: ReviewSortValue
	label: string
}

const sortOptions: SortOption[] = [
	{
		value: "likes-desc",
		label: "Больше лайков",
	},
	{
		value: "dislikes-desc",
		label: "Больше дизлайков",
	},
	{
		value: "date-asc",
		label: "Сначала новые",
	},
	{ value: "date-desc", label: "Сначала старые" },
]

const filterOptions: FilterOption[] = [
	{
		value: "all",
		label: "Все",
	},
	{
		value: "meLiked",
		label: "Мне понравившееся",
	},
	{
		value: "meDisliked",
		label: "Мне непонравивеешся",
	},
	{
		value: "meCommented",
		label: "Мною прокоментированные",
	},
]

interface ReviewFilterPanelProps {
	sortValue: ReviewSortValue
	filterValue: ReviewFilterValue[]
	onChangeSortValue: (value: ReviewSortValue) => void
	onChangeFilterValue: (value: ReviewFilterValue[]) => void
}

export const ReviewFilterPanel = (props: ReviewFilterPanelProps) => {
	const { sortValue, filterValue, onChangeSortValue, onChangeFilterValue } =
		props

	const user = useSelector(userSelectors.getUser)

	const handleChangeFilterValue = useCallback(
		(value: string) => {
			const typedValue = value as ReviewFilterValue

			if (typedValue === "all") {
				if (filterValue.find((value) => value === "all")) {
					return
				} else {
					onChangeFilterValue(["all"])
				}
				return
			}

			const existingValue = filterValue.find((value) => value === typedValue)

			if (existingValue) {
				if (filterValue.length === 1) {
					onChangeFilterValue(["all"])
					return
				} else {
					onChangeFilterValue(filterValue.filter((value) => value !== typedValue))
					return
				}
			}

			if (typedValue === "meLiked") {
				onChangeFilterValue([
					...filterValue.filter(
						(value) => value !== "all" && value !== "meDisliked"
					),
					typedValue,
				])
				return
			}

			if (typedValue === "meDisliked") {
				onChangeFilterValue([
					...filterValue.filter((value) => value !== "all" && value !== "meLiked"),
					typedValue,
				])
				return
			}

			onChangeFilterValue([
				...filterValue.filter((value) => value !== "all"),
				typedValue,
			])
		},
		[filterValue, onChangeFilterValue]
	)

	const renderToggleButtons = useMemo(() => {
		return filterOptions.map((option) => {
			if (option.value === "all") {
				return (
					<CompositeItem
						key={option.value}
						render={
							<ToggleButton size="m" value={option.value}>
								{option.label}
							</ToggleButton>
						}
					/>
				)
			}

			return (
				<BaseTooltip key={option.value} label={option.label}>
					<CompositeItem
						render={
							<ToggleButton aria-label={option.label} size="m" value={option.value}>
								{option.value === "meLiked" ? (
									<Heart />
								) : option.value === "meDisliked" ? (
									<Dislike />
								) : (
									<Chat />
								)}
							</ToggleButton>
						}
					/>
				</BaseTooltip>
			)
		})
	}, [])

	const renderSortOptions = useMemo(() => {
		return sortOptions.map((option) => (
			<OptionItem key={option.value} value={option.value}>
				{option.label}
			</OptionItem>
		))
	}, [])

	return (
		<div className={styles["review-filter-panel"]}>
			<Composite
				render={
					<ToggleButtonGroup
						className={styles["toggle-button-group"]}
						stack={false}
						value={filterValue}
						onChange={handleChangeFilterValue}
						disabled={!user}
						aria-label="Группа кнопок для фильтрации отзывов"
					>
						{renderToggleButtons}
					</ToggleButtonGroup>
				}
			/>
			<Select
				className={styles["select"]}
				label="Сортировка отзывов"
				size="m"
				value={sortValue}
				onChange={onChangeSortValue}
				options={sortOptions}
				getOptionValue={(option) => option.value}
				getOptionLabel={(option) => option.label}
				required
				hiddenLabel
				centeringValue
			>
				{renderSortOptions}
			</Select>
		</div>
	)
}
