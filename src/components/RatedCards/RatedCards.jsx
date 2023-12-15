import { Box, Typography } from "@mui/material";
import { Movie } from "../index";

import useStyle from "./styles";

const RatedCards = ({ title, data }) => {
	const classes = useStyle();

	console.log(data?.results);

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				{title}
			</Typography>
			<Box display="flex" flexWrap="wrap" className={classes.container}>
				{data?.results.map((movie, index) => (
					<Movie key={index} movie={movie} index={index} />
				))}
			</Box>
		</Box>
	);
};

export default RatedCards;
