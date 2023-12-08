import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import MovieList from "../MovieList/MovieList";

import {
	useGetActorDetailsQuery,
	useGetMovieByActorIdQuery,
} from "../../services/TMBD";

import useStyle from "./styles";
import Pagination from "../Pagination/Pagination";

const Actors = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);

	const { data, isFetching, error } = useGetActorDetailsQuery(id);
	const { data: actorMovie } = useGetMovieByActorIdQuery({ id, page });

	const classes = useStyle();

	console.log(actorMovie);

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
				<Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}></Button>
			</Box>
		);
	}

	return (
		<Grid>
			<Grid container spacing={3} className={classes.containerSpaceAround}>
				<Grid item lg={5} xl={4}>
					<img
						className={classes.image}
						src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
						alt={data?.name}
					/>
				</Grid>
				<Grid
					item
					lg={7}
					xl={8}
					style={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Typography variant="h2" gutterBottom>
						{data?.name}
					</Typography>
					<Typography variant="h5" gutterBottom>
						Born: {new Date(data?.birthday).toDateString()}
					</Typography>
					<Typography variant="body2" paragraph>
						{data?.biography || "Sorry, no biography yet"}
					</Typography>
					<Box marginTop="2rem" display="flex" justifyContent="space-around">
						<Button
							variant="contained"
							color="primary"
							target="_blank"
							href={`https://www.imdb.com/title/${data?.imdb_id}`}
						>
							IMDB
						</Button>
						<Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
							Back
						</Button>
					</Box>
				</Grid>
			</Grid>

			<Box marginTop="5rem" width="100%">
				<Typography variant="h3" gutterBottom align="center">
					Movies
				</Typography>

				{actorMovie ? (
					<MovieList movies={actorMovie} numberOfMovies={12} />
				) : (
					<Box>Sorry, nothing was found.</Box>
				)}
			</Box>

			<Pagination
				currentPage={page}
				setPage={setPage}
				totalPages={actorMovie.total_pages}
			/>
		</Grid>
	);
};

export default Actors;
