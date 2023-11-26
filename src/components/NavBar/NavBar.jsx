import { Link } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	useMediaQuery,
	IconButton,
	useTheme,
	Button,
	Avatar,
} from "@mui/material";

import {
	Menu,
	Brightness4,
	Brightness7,
	AccountCircle,
} from "@mui/icons-material";

import useStyle from "./styles";

const NavBar = () => {
	const classes = useStyle();
	const isMobile = useMediaQuery("(max-width:600px)");
	const theme = useTheme();
	const isAuthenticated = true;

	return (
		<AppBar>
			<Toolbar className={classes.toolbar}>
				{isMobile && (
					<IconButton
						color="inherit"
						edge="start"
						style={{ outline: "none" }}
						onClick={() => {}}
						className={classes.menuButton}
					>
						<Menu />
					</IconButton>
				)}
				<IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
					{theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
				{!isMobile && "search..."}
				<div className="">
					{!isAuthenticated ? (
						<Button color="inherit" onClick={() => {}}>
							Login &nbsp; <AccountCircle />
						</Button>
					) : (
						<Button
							color="inherit"
							component={Link}
							to={`/profile/:id`}
							className={classes.linkButton}
							onClick={() => {}}
						>
							{!isMobile && <>My Movies &nbsp;</>}
							<Avatar
								style={{ width: 30, height: 30 }}
								alt="Profile"
								src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
							/>
						</Button>
					)}
				</div>
				{isMobile && "search..."}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;

// 1. Navigation Bar - 9:00
