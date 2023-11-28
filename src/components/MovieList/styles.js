import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
	movieContainer: {
		display: "flex",
		overflow: "auto",
		flexWrap: "wrap",

		[theme.breakpoints.down("sm")]: {
			justifyContent: "center",
		},
	},
}));
