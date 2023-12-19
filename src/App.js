import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { BaseProvider, LightTheme } from "baseui";

import { Spinner } from "baseui/spinner";
import { useEffect, useState } from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import Drop from "./pages/Drop";
import Preview from "./pages/Preview";

const engine = new Styletron();
const ffmpeg = createFFmpeg({
	log: true,
});
function App() {
	// load ffmpeg
	const [ready, setReady] = useState(false);
	const load = async () => {
		!ffmpeg.isLoaded() && (await ffmpeg.load());
		setReady(true);
	};

	useEffect(() => {
		load();
	}, []);
	return (
		<>
			<h1 style={{ textAlign: "center" }}>Video to GIF Converter</h1>
			<Router>
				<StyletronProvider value={engine}>
					<BaseProvider theme={LightTheme}>
						{ready ? (
							<Routes>
								<Route path="/" element={<Drop />} />
								<Route path="/preview" element={<Preview ffmpeg={ffmpeg} />} />
							</Routes>
						) : (
							<Spinner />
						)}
					</BaseProvider>
				</StyletronProvider>
			</Router>
		</>
	);
}

export default App;
