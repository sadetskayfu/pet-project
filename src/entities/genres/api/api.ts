import { jsonApiInstance } from '@/shared/api'
import { queryOptions } from '@tanstack/react-query'
import { CreateGenreBody, Genre } from '../model/Genre'

export const genreApi = {
	baseKey: 'genre',

	createGenre: (body: CreateGenreBody) =>
		jsonApiInstance<Genre>('/genres', {
			method: 'POST',
			json: body,
		}),
	updateGenre: (id: number, body: CreateGenreBody) =>
		jsonApiInstance<Genre>(`/genres/${id}`, {
			method: 'PUT',
			json: body,
		}),
	deleteGenre: (id: number) =>
		jsonApiInstance<Genre>(`/genres/${id}`, {
			method: 'DELETE',
		}),
	getGenresQueryOptions: () => {
		return queryOptions({
			queryKey: [genreApi.baseKey],
			queryFn: ({ signal }) =>
				jsonApiInstance<Genre[]>('/genres', { signal }),
			staleTime: Infinity,
		})
	},
}
