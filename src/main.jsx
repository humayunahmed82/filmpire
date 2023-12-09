import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import store from "./app/store";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<React.StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</React.StrictMode>
		</ThemeProvider>
	</Provider>
);
