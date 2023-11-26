import { configureStore } from "@reduxjs/toolkit";
import { tmbdApi } from "../services/TMBD";

const store = configureStore({
	reducer: {
		[tmbdApi.reducerPath]: tmbdApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tmbdApi.middleware),
});

export default store;
