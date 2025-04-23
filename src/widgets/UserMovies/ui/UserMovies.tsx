import { Tab } from "@/shared/ui/Tab"
import { Tabs } from "@/shared/ui/Tabs"
import { WatchedPanel } from "./Panels/WatchedPanel"
import { WishedPanel } from "./Panels/WishedPanel"
import { useId, useLayoutEffect, useMemo, useRef, useState } from "react"
import { TabPanel } from "@/shared/ui/TabPanel"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { BookMark, Eye, LongArrow } from "@/shared/assets/icons"
import { useWindowWidth } from "@/app/providers/windowWidth"
import { VIEWPORT } from "@/shared/constants/viewport"
import { BaseTooltip } from "@/shared/ui/Tooltip"
import { GenderType } from "@/entities/profile"
import { Typography } from "@/shared/ui/Typography"
import { Button } from "@/shared/ui/Button"
import { ROUTES } from "@/shared/constants/routes"
import styles from "./style.module.scss"

type PanelValue = "watched" | "wished"

type Option = {
	value: PanelValue
	label: string
}

interface UserMoviesProps {
	userId: number
	gender?: GenderType | null
	isMe: boolean
	isHiddenWatched?: boolean
	isHiddenWished?: boolean
	totalWatched: number
	totalWished: number
}

export const UserMovies = ({
	userId,
	isMe,
	gender,
	isHiddenWatched,
	isHiddenWished,
	totalWatched,
	totalWished,
}: UserMoviesProps) => {
	const [activePanel, setActivePanel] = useState<PanelValue>(
		isHiddenWatched && !isMe ? "wished" : "watched"
	)
	const [isMobile, setIsMobile] = useState<boolean>(false)

	const id = useId()

	const sectionRef = useRef<HTMLDivElement>(null)

	const { windowWidth } = useWindowWidth()

	const options: Option[] = useMemo(
		() => [
			{
				value: "watched",
				label: isMe
					? `Я ${gender === "woman" ? "посмотрела" : "посмотрел"}`
					: "Просмотренное пользователем",
			},
			{
				value: "wished",
				label: isMe ? "Я хочу посмотреть" : "Пользователь хочет посмотреть",
			},
		],
		[isMe, gender]
	)

	useLayoutEffect(() => {
		setIsMobile(windowWidth <= VIEWPORT.MOBILE)
	}, [windowWidth])

	const renderTabs = useMemo(() => {
		return options.map((option) => {
			const isDisabled =
				!isMe &&
				((option.value === "watched" && isHiddenWatched) ||
					(option.value === "wished" && isHiddenWished))
			const label = isDisabled ? `${option.label} (скрыто)` : option.label

			if (isMobile) {
				return (
					<BaseTooltip key={option.value} label={option.label}>
						<Tab
							disabled={isDisabled}
							id={id + option.value + "tab"}
							panelId={id + option.value + "panel"}
							value={option.value}
							aria-label={label}
							icon={option.value === "watched" ? <Eye /> : <BookMark />}
							variant="clear"
						/>
					</BaseTooltip>
				)
			} else {
				return (
					<Tab
						disabled={isDisabled}
						key={option.value}
						id={id + option.value + "tab"}
						panelId={id + option.value + "panel"}
						value={option.value}
						label={label}
						variant="clear"
					/>
				)
			}
		})
	}, [id, options, isMobile, isMe, isHiddenWatched, isHiddenWished])

	const renderPanels = useMemo(() => {
		return options.map((option) => {
			const panelPops = {
				isActive: option.value === activePanel,
				id: id + option.value + "panel",
				labelId: id + option.value + "tab",
			}

			if (option.value === "watched") {
				return (
					<TabPanel key={option.value} {...panelPops}>
						<WatchedPanel
							sectionRef={sectionRef}
							isMe={isMe}
							userId={userId}
							isMobile={isMobile}
							totalWatched={totalWatched}
						/>
					</TabPanel>
				)
			} else {
				return (
					<TabPanel key={option.value} {...panelPops}>
						<WishedPanel
							sectionRef={sectionRef}
							isMe={isMe}
							userId={userId}
							isMobile={isMobile}
							totalWished={totalWished}
						/>
					</TabPanel>
				)
			}
		})
	}, [
		activePanel,
		id,
		isMe,
		isMobile,
		totalWished,
		totalWatched,
		userId,
		options,
	])

	return (
		<div ref={sectionRef} className={styles["section"]}>
			<SectionTitle
				label={isMe ? "Мое медиа" : "Добавленное пользователем медиа"}
				centering={isMobile ? true : false}
			/>
			{totalWatched === 0 && totalWished === 0 ? (
				<div className={styles["no-media"]}>
					<Typography color="soft">
						{isMe
							? "У вас не добавлено ниодного медиа."
							: "У пользователя не добавлено ниодного медиа."}
					</Typography>
					{isMe && (
						<Button variant="clear" to={ROUTES.CATALOG}>
							Перейти в каталог
							<LongArrow color="primary" direction="right" />
						</Button>
					)}
				</div>
			) : (
				<div>
					<Tabs
						className={styles["tabs"]}
						indicator
						value={activePanel}
						onChange={setActivePanel}
					>
						{renderTabs}
					</Tabs>
					{renderPanels}
				</div>
			)}
		</div>
	)
}
