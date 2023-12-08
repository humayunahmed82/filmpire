import { Grid } from "@mui/material";
import { Movie } from "../index";

import useStyle from "./styles";

const MovieList = ({ movies, numberOfMovies }) => {
	const classes = useStyle();

	return (
		<Grid container className={classes.movieContainer}>
			{movies.results.slice(0, numberOfMovies).map((movie, index) => (
				<Movie key={index} movie={movie} index={index} />
			))}
		</Grid>
	);
};

export default MovieList;
