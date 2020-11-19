import { nanoid } from 'nanoid'

import firebase from './firebase'
import toSlug from './toSlug'

import 'firebase/firestore'

const RESERVED_NAMES = ['new']

const firestore = firebase.firestore()

const getRoomSlug = async (name: string) => {
	const slug = toSlug(name)
	
	return (
		RESERVED_NAMES.includes(slug) ||
		(await firestore.doc(`rooms/${slug}`).get()).exists
	)
		? `${slug}-${nanoid(5)}`
		: slug
}

export default getRoomSlug
