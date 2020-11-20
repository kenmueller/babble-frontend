import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import Room from 'models/Room'
import User from 'models/User'
import firebase from 'lib/firebase'

import styles from 'styles/RoomHeader.module.scss'

export interface RoomHeaderProps {
	className?: string
	currentUser: firebase.User | null | undefined
	room: Room
	owner: User | null
}

const RoomHeader = ({ className, currentUser, room, owner }: RoomHeaderProps) => {
	return (
		<div className={cx(styles.root, className)}>
			<header className={styles.header}>
				<h1 className={styles.name}>{room.name}</h1>
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
