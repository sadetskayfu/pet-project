import { Typography } from "@/shared/ui/Typography"
import styles from "./style.module.scss"

const MainPanel = () => {
	return (
		<Typography className={styles['title']} textAlign="center" component="h1" size="h5" color="hard">
			Добро пожаловать в панель администрации. Здесь вы можете создавать, изменять
			или удалять сущности, такие как: медиа, жанры и актеры
		</Typography>
	)
}

export default MainPanel
