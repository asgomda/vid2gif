import { styled } from "baseui";
import { FileUploader } from "baseui/file-uploader";
import * as React from "react";
import { useNavigate } from "react-router-dom";
const Centered = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: "auto",
	height: "100svh",
	width: "100wh",
});

export default function Drop() {
	let navigate = useNavigate();

	const handleFileDrop = (acceptedFiles, rejectedFiles) => {
		// handle file upload...
		console.log(acceptedFiles, rejectedFiles);

		// Redirect to the next page
		navigate("/preview");
	};
	return (
		<>
			<Centered>
				<FileUploader
					accept="video/*"
					onDrop={handleFileDrop}
					onError={(error) => {
						console.log("Error occured!"); // move this to snackbar
					}}
					// progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
					overrides={{
						FileDragAndDrop: {
							style: (props) => ({
								width: "50vw",
								borderLeftColor: props.$isDragActive
									? props.$theme.colors.positive
									: props.$theme.colors.warning,
								borderRightColor: props.$isDragActive
									? props.$theme.colors.positive
									: props.$theme.colors.warning,
								borderTopColor: props.$isDragActive
									? props.$theme.colors.positive
									: props.$theme.colors.warning,
								borderBottomColor: props.$isDragActive
									? props.$theme.colors.positive
									: props.$theme.colors.warning,
							}),
						},
						ContentMessage: {
							style: (props) => ({
								color: props.$theme.colors.warning,
							}),
						},
						ContentSeparator: {
							style: (props) => ({
								color: props.$theme.colors.warning,
							}),
						},
					}}
				/>
			</Centered>
		</>
	);
}
