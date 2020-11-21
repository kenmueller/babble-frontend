self.addEventListener('push', event => {
	const { title, body, url } = event.data.json()
	
	event.waitUntil(
		self.registration.showNotification(title, {
			body,
			data: { url }
		})
	)
})

self.addEventListener('notificationclick', event => {
	const { notification } = event
	const { url } = notification.data
	
	notification.close()
	event.waitUntil(
		clients.matchAll({ type: 'window' }).then(_clients => {
			const client = _clients.find(client =>
				client.url === url && 'focus' in client
			)
			
			if (client)
				client.focus()
			else if (clients.openWindow)
				clients.openWindow(url)
		})
	)
})
