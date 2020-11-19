import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface EditRoomData {
	name: string
	description: string
}

const editRoom = (slug: string, data: EditRoomData) =>
	firestore.doc(`rooms/${slug}`).update(data)

export default editRoom
