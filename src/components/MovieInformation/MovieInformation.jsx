import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetMovieQuery } from "../../services/TMBD";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import {
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Grid,
	Rating,
	Typography,
} from "@mui/material";
import genresIcon from "../../assets/genres/index";

import useStyle from "./styles";
import {
	Movie as MovieIcon,
	Language,
	Theaters,
	FavoriteBorderOutlined,
	Favorite,
	Remove,
	PlusOne,
	ArrowBack,
} from "@mui/icons-material";

const MovieInformation = () => {
	const { id } = useParams();
	const { data, isFetching, error } = useGetMovieQuery(id);
	const dispatch = useDispatch();

	const addToFavorites = () => {};
	const addToWatchLists = () => {};

	const isMovieFavorited = false;
	const isMovieWatchlist = false;

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
							style={{ textDecoration: "none" }}
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
				<Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
					Overview
				</Typography>
				<Typography gutterBottom style={{ marginTop: "10px" }}>
					{data?.overview}
				</Typography>
				<Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
					Top Cast
				</Typography>
				<Grid item container spacing={2}>
					{data &&
						data?.credits?.cast
							.map(
								(character, index) =>
									character.profile_path && (
										<Grid
											key={index}
											item
											xs={4}
											md={2}
											component={Link}
											to={`/actors/${character.id}`}
											style={{ textDecoration: "none" }}
										>
											<img
												className={classes.castImage}
												src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
												alt={character.name}
											/>
											<Typography color="textPrimary">
												{character?.name}
											</Typography>
											<Typography color="textSecondary">
												{character.character.split("/")[0]}
											</Typography>
										</Grid>
									)
							)
							.slice(0, 6)}
				</Grid>
				<Grid item container style={{ marginTop: "2rem" }}>
					<div className={classes.buttonsContainer}>
						<Grid item xs={12} sm={6} className={classes.buttonsContainer}>
							<ButtonGroup size="small" variant="outlined">
								<Button
									target="_blank"
									rel="noopener noreferre"
									href={data?.homepage}
									endIcon={<Language />}
								>
									Website
								</Button>
								<Button
									target="_blank"
									rel="noopener noreferre"
									href={`https://www.imdb.com/title/${data?.imdb_id}`}
									endIcon={<MovieIcon />}
								>
									IMDB
								</Button>
								<Button onClick={() => {}} href="#" endIcon={<Theaters />}>
									Trailer
								</Button>
							</ButtonGroup>
						</Grid>
						<Grid item xs={12} sm={6} className={classes.buttonsContainer}>
							<ButtonGroup size="small" variant="outlined">
								<Button
									onClick={addToFavorites}
									endIcon={
										isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
									}
								>
									{isMovieFavorited ? "unfavorite" : "Favorite"}
								</Button>
								<Button
									onClick={addToWatchLists}
									endIcon={isMovieWatchlist ? <Remove /> : <PlusOne />}
								>
									Watchlist
								</Button>
								<Button
									endIcon={<ArrowBack />}
									sx={{ borderColor: "primary.main" }}
								>
									<Typography
										component={Link}
										to="/"
										color="inherit"
										variant="subtitle2"
										style={{ textDecoration: "none" }}
									>
										Back
									</Typography>
								</Button>
							</ButtonGroup>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MovieInformation;

// 14. Movie Information Page - Part 1
