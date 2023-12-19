import { fetchFile } from "@ffmpeg/ffmpeg";
import { styled } from "baseui";
import { Button } from "baseui/button";
import { Card, StyledAction, StyledBody } from "baseui/card";
import { useAtom } from "jotai";
import { gifAtom } from "../atoms/gif";
import { videoAtom } from "../atoms/video";
import { downloadGif } from "../utils/downloadGif";

export default function Preview({ ffmpeg }) {
	const [video] = useAtom(videoAtom);
	const [gif, setGif] = useAtom(gifAtom);

	const convertToGif = async () => {
		// Write the file to memory
		console.log("FFmpeg: ", ffmpeg);
		ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

		// Run the FFMpeg command
		await ffmpeg.run(
			"-i",
			"test.mp4",
			"-t",
			"2.5",
			"-ss",
			"2.0",
			"-f",
			"gif",
			"out.gif"
		);

		// Read the result
		const data = ffmpeg.FS("readFile", "out.gif");

		// Create a URL
		const url = URL.createObjectURL(
			new Blob([data.buffer], { type: "image/gif" })
		);
		return setGif(url);
	};

	const handleConvert = () => {
		!gif ? convertToGif(ffmpeg, video) : downloadGif(gif);
	};

	return (
		<>
			<Centered>
				{video && (
					<Card headerImage={gif ? gif : ""}>
						{!gif ? (
							<StyledVideo autoPlay loop controls>
								<source src={URL.createObjectURL(video)} type="video/mp4" />
								Your browser does not support the video tag.
							</StyledVideo>
						) : null}
						<StyledBody>
							{!gif ? "Preview of video uploaded" : "Your download is ready!"}
						</StyledBody>

						<StyledAction>
							<Button
								overrides={{ BaseButton: { style: { width: "100%" } } }}
								onClick={handleConvert}
							>
								{gif ? "Download" : "Convert"}
							</Button>
						</StyledAction>
					</Card>
				)}
			</Centered>
		</>
	);
}

const StyledVideo = styled("video", {
	height: "auto",
	display: "flex",
	borderRadius: "8px",
});

const Centered = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: "auto",
	height: "90svh",
	width: "100wh",
});
