import { jsonApiInstance } from '@/shared/api'
import { queryOptions } from '@tanstack/react-query'
import { Genre } from '../model/Genre'

export const genreApi = {
	baseKey: 'genre',

	createGenre: (name: string) =>
		jsonApiInstance<Genre>('/genres', {
			method: 'POST',
			json: { name },
		}),
	updateGenre: (id: number, name: string) =>
		jsonApiInstance<Genre>(`/genres/${id}`, {
			method: 'PUT',
			json: { name },
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
