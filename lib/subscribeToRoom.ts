import firebase from './firebase'
import getSubscription from './getSubscription'

import 'firebase/firestore'

const { FieldValue } = firebase.firestore
const firestore = firebase.firestore()

const subscribeToRoom = async (uid: string, slug: string, subscribe: boolean) => {
	if (subscribe) {
		const [snapshot, subscription] = await Promise.all([
			firestore.doc(`pushSubscriptions/${uid}`).get(),
			getSubscription().then(JSON.stringify)
		])
		
		if (!snapshot.get('subscriptions')?.includes(subscription))
			await snapshot.ref.set({
				subscriptions: FieldValue.arrayUnion(subscription)
			})
	}
	
	const doc = firestore.doc(`rooms/${slug}/subscribers/${uid}`)
	await (subscribe ? doc.set({}) : doc.delete())
}

export default subscribeToRoom
