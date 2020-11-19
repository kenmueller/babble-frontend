import User from 'models/User'
import firebase from './firebase'

const snapshotToUser = (snapshot: firebase.firestore.DocumentSnapshot): User | null =>
	snapshot.exists
		? {
			id: snapshot.id,
			slug: snapshot.get('slug'),
			name: snapshot.get('name'),
			about: snapshot.get('about')
		}
		: null

export default snapshotToUser
