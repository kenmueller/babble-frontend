import firebase from './firebase'
import snapshotToRoom from './snapshotToRoom'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getRoom = async (slug: string) =>
	snapshotToRoom(await firestore.doc(`rooms/${slug}`).get())

export default getRoom
