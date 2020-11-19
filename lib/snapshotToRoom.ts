import Room from 'models/Room'
import firebase from './firebase'

const snapshotToRoom = (snapshot: firebase.firestore.DocumentSnapshot) =>
	snapshot.exists
		? { slug: snapshot.id, ...snapshot.data() } as Room
		: null

export default snapshotToRoom
