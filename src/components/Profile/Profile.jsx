import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Button, Typography } from "@mui/material";

const Profile = () => {
	const { user } = useSelector(userSelector);

	const favoriteMovies = [];

	const logout = () => {
		localStorage.clear();

		window.location.href = "/";
	};

	return (
		<Box>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h4" gutterBottom>
					My Profile
				</Typography>
				<Button color="inherit" onClick={logout}>
					Logout &nbsp;
				</Button>
			</Box>
			{!favoriteMovies.length ? (
				<Typography variant="h5">
					Add Favorite or watchlist some to see them here!
				</Typography>
			) : (
				<Box>FAVORITE MOVIES</Box>
			)}
		</Box>
	);
};

export default Profile;
