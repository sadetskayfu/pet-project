import { Gear } from "@/shared/assets/icons"
import { Popover, PopoverClose, PopoverContent, PopoverHeading } from "@/shared/ui/Popover"
import { Select } from "@/shared/ui/Select"
import { IconButton } from "@/shared/ui/IconButton"
import { Typography } from "@/shared/ui/Typography"
import { useSpeed } from "../../hooks/useSpeed"
import { memo, useId, useMemo, useRef, useState } from "react"
import { OptionItem } from "@/shared/ui/OptionItem"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { Button } from "@/shared/ui/Button"
import styles from "./style.module.scss"

type Option = {
	value: string
	label: string
}

interface SettingMenuProps {
	videoRef: React.RefObject<HTMLVideoElement | null>
	qualityOptions: Option[]
	quality: string
	onChangeQuality: (value: string) => void
	portalTarget: React.RefObject<HTMLElement | null>
}

export const SettingMenu = memo((props: SettingMenuProps) => {
	const { videoRef, qualityOptions, quality, onChangeQuality, portalTarget } =
		props

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const popoverId = useId()

	const settingButtonRef = useRef<HTMLButtonElement>(null)

	const { speed, speedOptions, handleSpeedChange } = useSpeed(videoRef)

	const renderSpeedOptions = useMemo(() => {
		return speedOptions.map((option) => (
			<OptionItem key={option.value} value={option.value}>
				{option.label}
			</OptionItem>
		))
	}, [speedOptions])

	const renderQualityOptions = useMemo(() => {
		return qualityOptions.map((option) => (
			<OptionItem key={option.value} value={option.value}>
				{option.label}
			</OptionItem>
		))
	}, [qualityOptions])

	return (
		<Popover
			referenceRef={settingButtonRef}
			open={isOpen}
			setOpen={setIsOpen}
			placement="top-end"
			portalTarget={portalTarget}
			initialFocus={0}
			modal
		>
			<BaseTooltip label="Settings" portalTarget={portalTarget}>
				<IconButton
					ref={settingButtonRef}
					onClick={() => setIsOpen((prev) => !prev)}
					className={styles["setting-button"]}
					color="light"
					aria-label="Settings"
					borderRadius="none"
					size="xs"
					variant="clear"
					data-open-popover={isOpen || undefined}
					aria-controls={isOpen ? popoverId : undefined}
					aria-haspopup="dialog"
					aria-expanded={isOpen ? "true" : "false"}
				>
					<Gear />
				</IconButton>
			</BaseTooltip>
			<PopoverContent id={popoverId} className={styles["menu"]}>
				<PopoverHeading>
					<span className="visually-hidden">Video player settings</span>
				</PopoverHeading>
				<PopoverClose>
					<Button size="xs">
						Close
					</Button>
				</PopoverClose>
				<Select
					fullWidth
					hiddenLabel
					required
					label="Speed"
					variant="standard"
					options={speedOptions}
					value={speed}
					onChange={handleSpeedChange}
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					renderValue={(option) => (
						<Typography className={styles["select-render-value"]} color="hard">
							Speed: <span>{option.label}</span>
						</Typography>
					)}
					menuProps={{
						placement: "top",
					}}
				>
					{renderSpeedOptions}
				</Select>
				<Select
					fullWidth
					hiddenLabel
					required
					label="Quality"
					variant="standard"
					options={qualityOptions}
					value={quality}
					onChange={onChangeQuality}
					getOptionLabel={(option) => option.label}
					getOptionValue={(option) => option.value}
					renderValue={(option) => (
						<Typography className={styles["select-render-value"]} color="hard">
							Quality: <span>{option.label}</span>
						</Typography>
					)}
					menuProps={{
						placement: "bottom",
					}}
				>
					{renderQualityOptions}
				</Select>
			</PopoverContent>
		</Popover>
	)
})
