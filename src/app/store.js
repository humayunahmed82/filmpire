import { configureStore } from "@reduxjs/toolkit";
import { tmbdApi } from "../services/TMBD";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";

const store = configureStore({
	reducer: {
		[tmbdApi.reducerPath]: tmbdApi.reducer,
		currentGenreOrCategory: genreOrCategoryReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tmbdApi.middleware),
});

export default store;
