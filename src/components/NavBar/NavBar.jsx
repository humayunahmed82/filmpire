import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
	AppBar,
	Toolbar,
	useMediaQuery,
	IconButton,
	useTheme,
	Button,
	Avatar,
	Drawer,
} from "@mui/material";

import {
	Menu,
	Brightness4,
	Brightness7,
	AccountCircle,
} from "@mui/icons-material";

import { ColorModeContext } from "../../utils/ToggleColorMode";
import { Search, Sidebar } from "../index";
import { setUser, userSelector } from "../../features/auth";
import { fetchToken, createSessionId, moviesApi } from "../../utils";

import useStyle from "./styles";

const NavBar = () => {
	const { isAuthenticated, user } = useSelector(userSelector);
	const [mobileOpen, setMobileOpen] = useState(false);
	const classes = useStyle();
	const isMobile = useMediaQuery("(max-width:599.95px)");
	const theme = useTheme();
	const dispatch = useDispatch();

	const colorMode = useContext(ColorModeContext);

	const token = localStorage.getItem("request_token");
	const sessionIdFormLocalStorage = localStorage.getItem("session_id");

	useEffect(() => {
		const logInUser = async () => {
			if (token) {
				if (sessionIdFormLocalStorage) {
					const { data: userData } = await moviesApi.get(
						`/account?session_id=${sessionIdFormLocalStorage}`
					);
					dispatch(setUser(userData));
				} else {
					const sessionId = await createSessionId();

					const { data: userData } = await moviesApi.get(
						`/account?session_id=${sessionId}`
					);
					dispatch(setUser(userData));
				}
			}
		};
		logInUser();
	}, [token]);

	console.log(user);

	return (
		<>
			<AppBar>
				<Toolbar className={classes.toolbar}>
					{isMobile && (
						<IconButton
							color="inherit"
							edge="start"
							style={{ outline: "none" }}
							onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
							className={classes.menuButton}
						>
							<Menu />
						</IconButton>
					)}
					<IconButton
						color="inherit"
						sx={{ ml: 1 }}
						onClick={colorMode.toggleColorMode}
					>
						{theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
					{!isMobile && <Search />}
					<div className="">
						{!isAuthenticated ? (
							<Button color="inherit" onClick={fetchToken}>
								Login &nbsp; <AccountCircle />
							</Button>
						) : (
							<Button
								color="inherit"
								component={Link}
								to={`/profile/${user.id}`}
								className={classes.linkButton}
								onClick={() => {}}
							>
								{!isMobile && <>My Movies &nbsp;</>}
								<Avatar
									style={{ width: 30, height: 30 }}
									alt="Profile"
									src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
									// src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
								/>
							</Button>
						)}
					</div>
					{isMobile && <Search />}
				</Toolbar>
			</AppBar>

			<div className="">
				<nav className={classes.drawer}>
					{isMobile ? (
						<Drawer
							variant="temporary"
							anchor="right"
							open={mobileOpen}
							onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
							classes={{ paper: classes.drawerPaper }}
							ModalProps={{ keepMounted: true }}
						>
							<Sidebar setMobileOpen={setMobileOpen} />
						</Drawer>
					) : (
						<Drawer
							classes={{ paper: classes.drawerPaper }}
							variant="permanent"
							open
						>
							<Sidebar setMobileOpen={setMobileOpen} />
						</Drawer>
					)}
				</nav>
			</div>
		</>
	);
};

export default NavBar;
