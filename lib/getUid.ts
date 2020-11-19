import { toast } from 'react-toastify'

import firebase from './firebase'
import signIn from './signIn'

const getUid = async (currentUser: firebase.User | null) => {
	try {
		return currentUser?.uid ?? await signIn()
	} catch ({ message }) {
		toast.error(message)
		return null
	}
}

export default getUid
