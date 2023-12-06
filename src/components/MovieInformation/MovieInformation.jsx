import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetMovieQuery } from "../../services/TMBD";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import { Box, CircularProgress, Grid, Rating, Typography } from "@mui/material";
import genresIcon from "../../assets/genres/index";

import useStyle from "./styles";

const MovieInformation = () => {
	const { id } = useParams();
	const { data, isFetching, error } = useGetMovieQuery(id);
	const dispatch = useDispatch();

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
						<Typography
							variant="subtitle1"
							gutterBottom
							style={{ marginLeft: "10px" }}
						>
							{data?.vote_average} / 10
						</Typography>
					</Box>
					<Typography variant="h6" align="center" gutterBottom>
						{data?.runtime}min /{" "}
						{data?.spoken_languages.length > 0
							? `${data?.spoken_languages[0].name}`
							: ""}
					</Typography>
				</Grid>
				<Grid item className={classes.genresContainer}>
					{data?.genres.map((genre, index) => (
						<Link
							className={classes.links}
							to="/"
							key={genre.name}
							onClick={() => dispatch(selectGenreOrCategory(genre.id))}
						>
							<img
								src={genresIcon[genre.name.toLowerCase()]}
								className={classes.genreImages}
								height={30}
								alt=""
							/>
							<Typography variant="subtitle1" color="textPrimary">
								{genre.name}
							</Typography>
						</Link>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MovieInformation;

// 14. Movie Information Page - Part 1
