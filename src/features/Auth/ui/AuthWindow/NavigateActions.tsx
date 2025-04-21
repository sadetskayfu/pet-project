import { DelayGroup } from "@/shared/ui/DelayGroup"
import {
	BaseTooltip,
} from "@/shared/ui/Tooltip"
import { IconButton } from "@/shared/ui/IconButton"
import { House, LongArrow } from "@/shared/assets/icons"
import { ROUTES } from "@/shared/constants/routes"
import { useLocation, useNavigate } from "react-router-dom"
import { memo } from "react"
import { Divider } from "@/shared/ui/Divider"
import styles from "./style.module.scss"

export const NavigateActions = memo(() => {
	const location = useLocation()
	const navigate = useNavigate()

	const backNavigate = location.state?.from

	return (
		<div className={styles["navigate-actions"]}>
			<DelayGroup>
				<BaseTooltip label="Вернуться назад">
					<IconButton
						variant="clear"
						size="xs"
						borderRadius="m"
						to={backNavigate ?? navigate(-1)}
						borderPlacement="left"
						aria-label="Вернуться назад"
					>
						<LongArrow direction="left" />
					</IconButton>
				</BaseTooltip>
				<Divider style={{ marginInline: "0px" }} component="hr" />
				<BaseTooltip label="Вернуться на главную">
					<IconButton
						variant="clear"
						size="xs"
						borderRadius="m"
						to={ROUTES.HOME}
						borderPlacement="right"
						aria-label="Вернуться на главную"
					>
						<House />
					</IconButton>
				</BaseTooltip>
			</DelayGroup>
		</div>
	)
})
