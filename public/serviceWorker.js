self.addEventListener('push', event => {
	const { title, body } = event.data.json()
	self.registration.showNotification(title, { body })
})
