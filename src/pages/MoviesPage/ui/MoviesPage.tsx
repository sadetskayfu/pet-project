//import { DefaultBreadcrumbs } from '@/widgets/DefaultBreadcrumbs'
import { MovieCatalog } from '@/features/MovieCatalog'

const MoviesPage = () => {
	return (
		<div className='page'>
			<div className="container">
				<MovieCatalog />
			</div>
		</div>
	)
}

export default MoviesPage
