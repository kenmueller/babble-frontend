import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'

import 'firebase/auth'

const auth = firebase.auth()

const useCurrentUser = () => {
	const [user, setUser] = useState<firebase.User | null | undefined>()
	
	useEffect(() => (
		auth.onAuthStateChanged(
			setUser,
			({ message }) => toast.error(message)
		)
	), [setUser])
	
	return user
}

export default useCurrentUser
