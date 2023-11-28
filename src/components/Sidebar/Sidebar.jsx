import { useTheme } from "@mui/styles";
import { Link } from "react-router-dom";

import useStyle from "./styles";
import {
	Box,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import { useGetGenresQuery } from "../../services/TMBD";

const categories = [
	{ label: "Popular", value: "popular" },
	{ label: "Top Rated", value: "top_rated" },
	{ label: "Upcoming", value: "upcoming" },
];
const demoCategories = [
	{ label: "Comedy", value: "comedy" },
	{ label: "Action", value: "action" },
	{ label: "Horror", value: "horror" },
	{ label: "Animation", value: "animation" },
];

const redLogo =
	"https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
const blueLogo =
	"https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

const Sidebar = ({ setMobileOpen }) => {
	const { data, isFetching } = useGetGenresQuery();
	const theme = useTheme();
	const classes = useStyle();

	console.log(data);

	return (
		<>
			<Link to="/" className={classes.imageLink}>
				<img
					className={classes.image}
					src={theme.palette.mode === "light" ? blueLogo : redLogo}
					alt="Filmpire"
				/>
			</Link>
			<Divider />
			<List>
				<ListSubheader>Categories</ListSubheader>
				{categories.map(({ label, value }) => (
					<Link key={value} className={classes.links} to="/">
						<ListItem onClick={() => {}} button>
							{/* <ListItemIcon>
								<img
									src={blueLogo}
									className={classes.genreImages}
									height={30}
									alt=""
								/>
							</ListItemIcon> */}
							<ListItemText primary={label} />
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
			<List>
				<ListSubheader>Genres</ListSubheader>
				{isFetching ? (
					<Box display="flex" justifyContent="center">
						<CircularProgress size="4rem" />
					</Box>
				) : (
					data.genres.map(({ name, id }) => (
						<Link key={id} className={classes.links} to="/">
							<ListItem onClick={() => {}} button>
								{/* <ListItemIcon>
								<img
									src={blueLogo}
									className={classes.genreImages}
									height={30}
									alt=""
								/>
							</ListItemIcon> */}
								<ListItemText primary={name} />
							</ListItem>
						</Link>
					))
				)}
			</List>
		</>
	);
};

export default Sidebar;
