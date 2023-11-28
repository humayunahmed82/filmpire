import { Grid, Grow, Rating, Tooltip, Typography } from "@mui/material";
import useStyle from "./styles";
import { Link } from "react-router-dom";

const Movie = ({ movie, index }) => {
	const classes = useStyle();

	return (
		<Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
			<Grow in key={index} timeout={(index + 1) * 250}>
				<Link to={`/movie/${movie.id}`} className={classes.link}>
					<img
						className={classes.image}
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
								: "https://www.fillmurray.com/200/300"
						}
						alt={movie.title}
					/>
					<Typography className={classes.title} variant="h5">
						{movie.title}
					</Typography>
					<Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
						<div>
							<Rating readOnly value={movie.vote_average / 2} precision={0.1} />
						</div>
					</Tooltip>
				</Link>
			</Grow>
		</Grid>
	);
};

export default Movie;
