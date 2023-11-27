import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMBD";
import { MovieList } from "../index";

const Movies = () => {
	const { data, error, isFetching } = useGetMoviesQuery();

	console.log(data);

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
			<MovieList movies={data} />
		</div>
	);
};

export default Movies;
