import { Grid } from "@mui/material";
import { Movie } from "../index";

import useStyle from "./styles";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
	const classes = useStyle();
	const startFrom = excludeFirst ? 1 : 0;

	return (
		<Grid container className={classes.movieContainer}>
			{movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (
				<Movie key={index} movie={movie} index={index} />
			))}
		</Grid>
	);
};

export default MovieList;
