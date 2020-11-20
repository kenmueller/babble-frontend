export const requestAudio = () =>
	navigator.mediaDevices.getUserMedia({ audio: true })

export const requestVideo = () =>
	navigator.mediaDevices.getUserMedia({ video: true })
