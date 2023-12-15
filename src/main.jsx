import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import store from "./app/store";
import { Provider } from "react-redux";

import ToggleColorMode from "./utils/ToggleColorMode";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ToggleColorMode>
			<React.StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</React.StrictMode>
		</ToggleColorMode>
	</Provider>
);
