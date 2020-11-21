import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const isSubscribedToRoom = async (uid: string, slug: string) =>
	(await firestore.doc(`rooms/${slug}/subscribers/${uid}`).get()).exists

export default isSubscribedToRoom
