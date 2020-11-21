import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import Room from 'models/Room'
import User from 'models/User'
import firebase from 'lib/firebase'
import subscribeToRoom from 'lib/subscribeToRoom'
import isSubscribedToRoom from 'lib/isSubscribedToRoom'
import Switch from './Switch'

import styles from 'styles/RoomHeader.module.scss'

export interface RoomHeaderProps {
	className?: string
	currentUser: firebase.User | null | undefined
	room: Room
	owner: User | null
}

const RoomHeader = ({ className, currentUser, room, owner }: RoomHeaderProps) => {
	const [isSubscribed, _setIsSubscribed] = useState<boolean | null>(null)
	
	const setIsSubscribed = useCallback((isSubscribed: boolean) => {
		if (!currentUser)
			return
		
		_setIsSubscribed(isSubscribed)
		subscribeToRoom(currentUser.uid, room.slug, isSubscribed)
	}, [_setIsSubscribed])
	
	useEffect(() => {
		if (!currentUser)
			return _setIsSubscribed(null)
		
		let shouldContinue = true
		
		isSubscribedToRoom(currentUser.uid, room.slug)
			.then(isSubscribed => shouldContinue && _setIsSubscribed(isSubscribed))
			.catch(({ message }) => shouldContinue && toast.error(message))
		
		return () => { shouldContinue = false }
	}, [currentUser, room.slug, _setIsSubscribed])
	
	return (
		<div className={cx(styles.root, className)}>
			<header className={styles.header}>
				<h1 className={styles.name}>{room.name}</h1>
				<Switch
					className={styles.subscribe}
					label="subscribe"
					isDisabled={isSubscribed === null}
					isOn={isSubscribed === true}
					setIsOn={setIsSubscribed}
				/>
				{currentUser?.uid === room.owner && (
					<Link href={`/${room.slug}/edit`}>
						<a className={styles.edit}>
							<FontAwesomeIcon className={styles.editIcon} icon={faEdit} />
							edit
						</a>
					</Link>
				)}
			</header>
			<p className={styles.owner}>
				By {owner
					? (
						<Link href={`/u/${owner.slug}`}>
							<a className={styles.ownerName}>{owner.name}</a>
						</Link>
					)
					: <span className={styles.ownerName} aria-disabled>anonymous</span>
				}
			</p>
		</div>
	)
}

export default RoomHeader
