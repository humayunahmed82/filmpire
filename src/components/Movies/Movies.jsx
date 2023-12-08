import { useState } from "react";
import { useSelector } from "react-redux";
import {
	Box,
	CircularProgress,
	Typography,
	useMediaQuery,
} from "@mui/material";

import { useGetMoviesQuery } from "../../services/TMBD";
import { MovieList, Pagination } from "../index";

const Movies = () => {
	const [page, setPage] = useState(1);

	const { genreIDOrCategoryName, searchQuery } = useSelector(
		(state) => state.currentGenreOrCategory
	);
	const { data, error, isFetching } = useGetMoviesQuery({
		genreIDOrCategoryName,
		page,
		searchQuery,
	});
	const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));

	const numberOfMovies = lg ? 16 : 18;

	if (isFetching)
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress size="4rem" />
			</Box>
		);

	if (!data.results.length)
		return (
			<Box display="flex" alignItems="center" justifyContent="center" mt="20px">
				<Typography variant="h4" textAlign="center">
					No movie math the name <br /> please search for the something else...
				</Typography>
			</Box>
		);

	if (error) return "An error has occurred. Please try again";

	return (
		<div>
			<MovieList movies={data} numberOfMovies={numberOfMovies} />
			<Pagination
				currentPage={page}
				setPage={setPage}
				totalPages={data.total_pages}
			/>
		</div>
	);
};

export default Movies;
