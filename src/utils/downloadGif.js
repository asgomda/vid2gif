export const downloadGif = (url) => {
	console.log("downloading: " + url);

	const a = document.createElement("a");
	a.href = url;
	a.download = "downloaded_image.gif"; // Set the file name for the download
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};
