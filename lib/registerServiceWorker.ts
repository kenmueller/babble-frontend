import urlBase64ToUint8Array from './urlBase64ToUint8Array'

const registerServiceWorker = async () => {
	try {
		const registration = await navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
		const serviceWorker = registration.installing ?? registration.waiting ?? registration.active
		
		serviceWorker.addEventListener('statechange', () => {
			if (serviceWorker.state === 'activated')
				subscribe(registration)
		})
	} catch (error) {
		console.error(error)
	}
}

const subscribe = async (registration: ServiceWorkerRegistration) => {
	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_KEY)
	})
	
	await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: { 'Content-Type': 'application/json' }
	})
}

export default registerServiceWorker
