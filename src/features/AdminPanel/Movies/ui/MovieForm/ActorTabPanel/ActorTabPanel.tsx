import { Actor, actorApi } from "@/entities/actors"
import { getFirstLetter } from "@/shared/helpers/formattingString"
import { useDebounce } from "@/shared/hooks"
import { Chip } from "@/shared/ui/Chip"
import { ActorOptionItem } from "@/shared/ui/OptionItem"
import { RHFAutocomplete } from "@/shared/ui/RHFControllers"
import { TabPanel } from "@/shared/ui/TabPanel"
import { useQuery } from "@tanstack/react-query"
import { memo, useCallback, useState } from "react"
import { FormSchema } from "../../../model/FormSchema"
import { Avatar } from "@/shared/ui/Avatar"
import { ActorPanelValue } from "../MovieForm"
import styles from "./style.module.scss"

interface ActorTabPanelProps {
	panelValue: ActorPanelValue
	panelId: string
	labelId: string
	inputLabel: string
	isActive: boolean
}

export const ActorTabPanel = memo((props: ActorTabPanelProps) => {
	const { panelValue, panelId, labelId, inputLabel, isActive } = props

	const [inputValue, setInputValue] = useState<string>("")
	const [debounceInputValue, setDebounceInputValue] = useState<string>("")

	const actorsQuery = useQuery({
		...actorApi.getActorsQueryOptions({
			name: debounceInputValue,
			limit: 20,
		}),
		enabled: debounceInputValue.length > 0,
	})

	const onChangeDebounceInputValue = useDebounce<(value: string) => void>(
		setDebounceInputValue,
		300
	)

	const handleChangeInputValue = useCallback(
		(value: string) => {
			setInputValue(value)
			onChangeDebounceInputValue(value)
		},
		[onChangeDebounceInputValue]
	)

	return (
		<TabPanel
			className={styles["panel"]}
			isActive={isActive}
			id={panelId}
			labelId={labelId}
		>
			<RHFAutocomplete<FormSchema, Actor, boolean>
				name={panelValue}
				label={inputLabel}
				placeholder={`Введите имя ${panelValue === "actors" ? "актера" : panelValue === "directors" ? "режиссера" : "сценариста"}`}
				inputValue={inputValue}
				onChangeInputValue={handleChangeInputValue}
				options={actorsQuery.data?.data || []}
				getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
				getOptionValue={(option) => String(option.id)}
				loading={actorsQuery.isLoading}
				renderValue={(option, onDelete) => (
					<Chip
						avatar={<Avatar src={option.photoUrl} />}
						color="secondary"
						key={option.id}
						label={`${getFirstLetter(option.firstName)}. ${option.lastName}`}
						tabIndex={-1}
						onClose={onDelete}
					/>
				)}
				renderOption={(option, props) => (
					<ActorOptionItem
						key={option.id}
						src={option.photoUrl}
						value={String(option.id)}
						firstName={option.firstName}
						lastName={option.lastName}
						{...props}
					/>
				)}
				menuProps={{
					height: 400,
				}}
				multiple
				notFilter
				hiddenLabel
			/>
		</TabPanel>
	)
})
