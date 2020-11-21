import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const subscribeToRoom = (uid: string, slug: string, subscribe: boolean) => {
	const doc = firestore.doc(`rooms/${slug}/subscribers/${uid}`)
	return subscribe ? doc.set({}) : doc.delete()
}

export default subscribeToRoom
