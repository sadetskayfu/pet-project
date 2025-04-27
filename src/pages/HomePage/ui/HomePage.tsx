import { SectionTitle } from "@/shared/ui/SectionTitle"
import { HeightRatedMovies } from "@/widgets/HeightRatedMovies"
import { LastMovies } from "@/widgets/LastMovies"
import { LastReviews } from "@/widgets/LastReviews"
import { PopularMovies } from "@/widgets/PopularMovies"
import { PopularReviews } from "@/widgets/PopularReviews"

const HomePage = () => {
    return (
        <div className='page'>
            <div className='container'>
                <SectionTitle centering component="h1" label="Добро пожаловать на Yar-media-otzovik"/>
                <LastMovies />
                <LastReviews />
                <HeightRatedMovies />
                <PopularMovies />
                <PopularReviews />
            </div>
        </div>
    )
}

export default HomePage