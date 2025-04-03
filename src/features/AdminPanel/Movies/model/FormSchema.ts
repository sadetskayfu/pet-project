import { actorSchema } from '@/entities/actors/model/Actor'
import { genreSchema } from '@/entities/genres'
import { z } from 'zod'

export const formSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	releaseDate: z.string().min(1, { message: 'Release date is required' }),
	cardImgUrl: z.string().min(1, { message: 'Card img url is required' }),
	videoUrl: z.string().min(1, { message: 'Video url is required' }),
	ageLimit: z.string().min(1, { message: 'Age limit is required' }),
	countries: z.array(z.string()).min(1, { message: 'Country is required' }),
	duration: z.string().min(1, { message: 'Duration is required' }),
	genres: z.array(genreSchema).min(1, { message: 'Genres is required' }),
	actors: z.array(actorSchema).min(1, { message: 'Actors is required' }),
})

export type FormSchema = z.infer<typeof formSchema>
