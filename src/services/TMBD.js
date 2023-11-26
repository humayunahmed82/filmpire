import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_API_TMDB_KEY;
const page = 1;

export const tmbdApi = createApi({
	reducerPath: "tmbdApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
	endpoints: (builder) => ({
		// * get Movies by [type]
		getMovies: builder.query({
			query: () => `movie/popular?=${page}&api_key=${tmdbApiKey}`,
		}),
	}),
});

export const { useGetMoviesQuery } = tmbdApi;
