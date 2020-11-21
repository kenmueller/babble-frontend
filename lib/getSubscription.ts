import urlBase64ToUint8Array from './urlBase64ToUint8Array'

const getSubscription = async () => {
	if (!('serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window))
		throw new Error('Your browser doesn\'t support notifications')
	
	const registration = await navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
	const serviceWorker = registration.installing ?? registration.waiting ?? registration.active
	
	if (serviceWorker.state === 'activated')
		return onRegistration(registration)
	
	return new Promise<PushSubscription>((resolve, reject) => {
		serviceWorker.addEventListener('statechange', async () => {
			if (serviceWorker.state === 'activated')
				onRegistration(registration).then(resolve, reject)
		}, { once: true })
	})
}

const onRegistration = async (registration: ServiceWorkerRegistration) => {
	if (!await hasPermission())
		throw new Error('Notifications denied')
	
	return registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_KEY)
	})
}

const hasPermission = async () =>
	Notification.permission === 'granted' || (
		Notification.permission === 'default' &&
		await Notification.requestPermission() === 'granted'
	)

export default getSubscription
