import { Typography } from "@/shared/ui/Typography"

const ForbiddenPage = () => {
	return (
		<div className="page">
			<div className="container">
				<Typography textAlign="center" color="hard" size="h4" component="h1">
					Вуупсс! У вас нету прав для этой страницы
				</Typography>
			</div>
		</div>
	)
}

export default ForbiddenPage
