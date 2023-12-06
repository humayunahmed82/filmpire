import { Link, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../services/TMBD";
import { Box, CircularProgress, Grid, Rating, Typography } from "@mui/material";

import useStyle from "./styles";

const MovieInformation = () => {
	const { id } = useParams();
	const { data, isFetching, error } = useGetMovieQuery(id);

	const classes = useStyle();

	console.log(data);

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress size="6rem" />
			</Box>
		);
	}

	if (error) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<Link to="/">Something has gone wrong - Go Back</Link>
			</Box>
		);
	}

	return (
		<Grid container className={classes.containerSpaceAround}>
			<Grid item sm={12} lg={4}>
				<img
					className={classes.poster}
					src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
					alt={data?.title}
				/>
			</Grid>
			<Grid item container direction="column" lg={7}>
				<Typography variant="h3" align="center" gutterBottom>
					{data?.title} ({data?.release_date.split("-")[0]})
				</Typography>
				<Typography variant="h5" align="center" gutterBottom>
					{data?.tagline}
				</Typography>
				<Grid container className={classes.containerSpaceAround}>
					<Box display="flex" align="center">
						<Rating readOnly value={data?.vote_average / 2} />
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MovieInformation;

// 14. Movie Information Page - Part 1
