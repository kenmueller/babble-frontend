import { VideoHTMLAttributes, useCallback } from 'react'
import { toast } from 'react-toastify'

const LocalVideo = (props: VideoHTMLAttributes<HTMLVideoElement>) => {
	const onVideoRef = useCallback((video: HTMLVideoElement | null) => {
		if (!video)
			return
		
		navigator.getUserMedia(
			{ video: true, audio: true },
			stream => video.srcObject = stream,
			({ message }) => message === 'Permission denied' || toast.error(message)
		)
	}, [])
	
	return <video ref={onVideoRef} autoPlay muted {...props} />
}

export default LocalVideo
