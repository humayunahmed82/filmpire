import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import useStyle from "./components/styles";

import {
	Actors,
	MovieInformation,
	Movies,
	NavBar,
	Profile,
} from "./components/index";

const App = () => {
	const classes = useStyle();

	return (
		<div className={classes.root}>
			<CssBaseline />

			<NavBar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Routes>
					<Route path="/" element={<Movies />}></Route>
					<Route path="/movie/:id" element={<MovieInformation />}></Route>
					<Route path="/actors/:id" element={<Actors />}></Route>
					<Route path="/profile/:id" element={<Profile />}></Route>
				</Routes>
			</main>
		</div>
	);
};

export default App;
