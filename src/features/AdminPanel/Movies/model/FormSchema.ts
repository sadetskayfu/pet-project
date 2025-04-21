import { MediaType } from "@/entities/movies"
import { z } from "zod"

const genreSchema = z.object({
    id: z.number(),
    name: z.string()
})

const actorSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string(),
    photoUrl: z.string().optional().nullable()
})

export const formSchema = z.object({
	title: z.string().min(1, { message: "Обязательное поле" }),
	description: z.string().min(1, { message: "Обязательное поле" }),
	releaseDate: z.string().min(1, { message: "Обязательное поле" }),
	cardImgUrl: z.string().min(1, { message: "Обязательное поле" }),
	posterUrl: z.string().min(1, { message: "Обязательное поле" }),
	ageLimit: z.string().min(1, { message: "Обязательное поле" }),
	countries: z.array(z.string()).min(1, { message: "Обязательное поле" }),
	duration: z.string().min(1, { message: "Обязательное поле" }),
	genres: z.array(genreSchema).min(1, { message: "Обязательное поле" }),
	actors: z.array(actorSchema),
	directors: z.array(actorSchema),
	writers: z.array(actorSchema),
	type: z.enum([
		'movie',
		'series',
		'animated_films'
	]) as z.ZodType<MediaType>,
})

export type FormSchema = z.infer<typeof formSchema>
