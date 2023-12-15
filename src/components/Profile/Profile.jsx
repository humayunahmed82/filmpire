import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { RatedCards } from "../index";

import { useGetListQuery } from "../../services/TMBD";
import { useEffect } from "react";

const Profile = () => {
	const { user } = useSelector(userSelector);

	const {
		data: favoriteMovies,
		isFetching: favoriteIsFetching,
		refetch: refetchFavorite,
	} = useGetListQuery({
		listName: "favorite/movies",
		accountId: user.id,
		sessionId: localStorage.getItem("session_id"),
		page: 1,
	});
	const {
		data: watchlistMovies,
		isFetching: watchlistIsFetching,
		refetch: refetchWatchlist,
	} = useGetListQuery({
		listName: "watchlist/movies",
		accountId: user.id,
		sessionId: localStorage.getItem("session_id"),
		page: 1,
	});

	useEffect(() => {
		refetchFavorite();
		refetchWatchlist();
	}, []);

	const logout = () => {
		localStorage.clear();

		window.location.href = "/";
	};

	if (favoriteIsFetching && watchlistIsFetching) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress size="6rem" />
			</Box>
		);
	}

	return (
		<Box>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h4" gutterBottom>
					My Profile
				</Typography>
				<Button color="inherit" onClick={logout}>
					Logout &nbsp; <ExitToApp />
				</Button>
			</Box>
			{!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
				<Typography variant="h5">
					Add Favorite or watchlist some to see them here!
				</Typography>
			) : (
				<Box>
					<RatedCards title="Favorite Movies" data={favoriteMovies} />
					<RatedCards title="Watchlist" data={watchlistMovies} />
				</Box>
			)}
		</Box>
	);
};

export default Profile;
