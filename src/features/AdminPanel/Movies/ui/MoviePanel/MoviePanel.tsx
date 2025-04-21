import { useState } from "react"
import { SearchInput } from "@/shared/ui/SearchInput"
import { Button } from "@/shared/ui/Button"
import { MovieList } from "../MovieList/MovieList"
import { CreateMovieDialogContent } from "../MovieDialogs/CreateMovieDialogContent"
import { Dialog, DialogTrigger } from "@/shared/ui/Dialog"
import { useWindowWidth } from "@/app/providers/windowWidth"
import styles from "./style.module.scss"

const MoviePanel = () => {
	const [searchValue, setSearchValue] = useState<string>("")

	const { windowWidth } = useWindowWidth()

	return (
		<div className={styles["movie-panel"]}>
			<Dialog>
				<div className={styles["actions"]}>
					<SearchInput
						className={styles["search-field"]}
						variant="outlined"
						label="Поиск медиа по названию"
						hiddenLabel
						fullWidth
						placeholder="Введите название медиа"
						value={searchValue}
						onChange={setSearchValue}
						borderPlacement={windowWidth > 580 ? "left" : "all"}
					/>
					<DialogTrigger>
						<Button
							className={styles["create-media-button"]}
							borderPlacement={windowWidth > 580 ? "right" : "all"}
							size="m"
						>
							Создать медиа
						</Button>
					</DialogTrigger>
				</div>
				<MovieList searchValue={searchValue} />
				<CreateMovieDialogContent />
			</Dialog>
		</div>
	)
}

export default MoviePanel
