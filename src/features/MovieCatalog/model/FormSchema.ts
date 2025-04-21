import { ExtendedMediaType, MovieSortValue } from "@/entities/movies"
import { z } from "zod"

export const formSchema = z.object({
	year: z.string(),
	rating: z.string(),
	countries: z.array(z.string()),
	genres: z.array(z.string()),
	sort: z.enum([
		"rating-asc",
		"rating-desc",
		"releaseYear-asc",
		"releaseYear-desc",
	]) as z.ZodType<MovieSortValue>,
	mediaType: z.string() as z.ZodType<ExtendedMediaType>
})

export type FormSchema = z.infer<typeof formSchema>
