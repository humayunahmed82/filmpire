import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_API_TMDB_KEY;
const page = 1;

export const tmbdApi = createApi({
	reducerPath: "tmbdApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
	endpoints: (builder) => ({
		// * get Movies by [type]
		getGenres: builder.query({
			query: () => `genre/movie/list?=${page}&api_key=${tmdbApiKey}`,
		}),
		// * get Movies by [type]
		getMovies: builder.query({
			query: ({ genreIDOrCategoryName, page, searchQuery }) => {
				// * Get Movies by search
				if (searchQuery) {
					return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
				}

				// * Get Movies by category
				if (
					genreIDOrCategoryName &&
					typeof genreIDOrCategoryName === "string"
				) {
					return `movie/${genreIDOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
				}

				// * Get Movies by genre
				if (
					genreIDOrCategoryName &&
					typeof genreIDOrCategoryName === "number"
				) {
					return `discover/movie?with_genres=${genreIDOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
				}

				// * Get popular Movies
				return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
			},
		}),
		// * get Movie
		getMovie: builder.query({
			query: (id) =>
				`movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
		}),

		// * Get user Specific List
		getRecommendations: builder.query({
			query: ({ movie_id, list }) =>
				`/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useGetGenresQuery,
	useGetMovieQuery,
	useGetRecommendationsQuery,
} = tmbdApi;
