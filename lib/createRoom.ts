import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface CreateRoomData {
	name: string
	description: string
	uid: string
}

const createRoom = (slug: string, { name, description, uid }: CreateRoomData) =>
	firestore.doc(`rooms/${slug}`).set({ name, description, owner: uid })

export default createRoom
