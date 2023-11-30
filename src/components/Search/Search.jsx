import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../features/currentGenreOrCategory";

import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import useStyle from "./styles";

const Search = () => {
	const classes = useStyle();
	const [query, setQuery] = useState("");
	const dispatch = useDispatch();

	const handelKeyPress = (event) => {
		if (event.key === "Enter") {
			dispatch(searchMovie(query));
		}
	};

	return (
		<div className={classes.searchContainer}>
			<TextField
				onKeyPress={handelKeyPress}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				variant="standard"
				InputProps={{
					className: classes.input,
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
};

export default Search;
