import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
import Drop from "./pages/Drop";
import Preview from "./pages/Preview";

import { BaseProvider, LightTheme } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

const engine = new Styletron();

function App() {
	return (
		<>
			<Router>
				<StyletronProvider value={engine}>
					<BaseProvider theme={LightTheme}>
						<Routes>
							<Route path="/" element={<Drop />} />
							<Route path="/preview" element={<Preview />} />
						</Routes>
					</BaseProvider>
				</StyletronProvider>
			</Router>
		</>
	);
}

export default App;
