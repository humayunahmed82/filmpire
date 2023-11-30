import { configureStore } from "@reduxjs/toolkit";
import { tmbdApi } from "../services/TMBD";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";

const store = configureStore({
	reducer: {
		[tmbdApi.reducerPath]: tmbdApi.reducer,
		currentGenreOrCategory: genreOrCategoryReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tmbdApi.middleware),
});

export default store;
