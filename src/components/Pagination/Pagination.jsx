import { Button, Typography } from "@mui/material";
import useStyle from "./styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
	const classes = useStyle();

	const handlePrev = () => {
		if (currentPage !== 1) {
			setPage((prevPage) => prevPage - 1);
		}
	};
	const handleNext = () => {
		if (currentPage !== totalPages) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	return (
		<div className={classes.container}>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				type="button"
				onClick={handlePrev}
			>
				Prev
			</Button>
			<Typography variant="h4" className={classes.pageNumber}>
				{currentPage}
			</Typography>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				type="button"
				onClick={handleNext}
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
