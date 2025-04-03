import { DelayGroup } from '@/shared/ui/DelayGroup'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip'
import { IconButton } from '@/shared/ui/IconButton'
import { House, LongArrow } from '@/shared/assets/icons'
import { Typography } from '@/shared/ui/Typography'
import { ROUTES } from '@/shared/constants/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { Divider } from '@/shared/ui/Divider'
import styles from './style.module.scss'

export const NavigateActions = memo(() => {
	const location = useLocation()
	const navigate = useNavigate()

	const backNavigate = location.state?.from

	return (
		<div className={styles['navigate-actions']}>
			<DelayGroup>
				<Tooltip placement='left'>
					<TooltipTrigger>
						<IconButton
							variant="clear"
							size="xs"
							borderRadius="m"
							to={backNavigate ?? navigate(-1)}
							borderPlacement="left"
						>
							<LongArrow direction="left" />
						</IconButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography size="helper" color="hard" component="p">
							Go back
						</Typography>
					</TooltipContent>
				</Tooltip>
				<Divider style={{ marginInline: '0px' }} component="hr" />
				<Tooltip placement='right'>
					<TooltipTrigger>
						<IconButton
							variant="clear"
							size="xs"
							borderRadius="m"
							to={ROUTES.HOME}
							borderPlacement="right"
						>
							<House />
						</IconButton>
					</TooltipTrigger>
					<TooltipContent>
						<Typography size="helper" color="hard" component="p">
							Go home
						</Typography>
					</TooltipContent>
				</Tooltip>
			</DelayGroup>
		</div>
	)
})
