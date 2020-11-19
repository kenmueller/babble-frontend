import { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { io as IO } from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import NotFound from 'pages/404'
import Room from 'models/Room'
import User from 'models/User'
import getRoom from 'lib/getRoom'
import getUser from 'lib/getUser'
import useCurrentUser from 'hooks/useCurrentUser'
import LocalVideo from 'components/LocalVideo'

import styles from 'styles/Room.module.scss'

export interface RoomPageProps {
	room: Room | null
	owner: User | null
}

const RoomPage: NextPage<RoomPageProps> = ({ room, owner }) => {
	if (!room)
		return <NotFound />
	
	const currentUser = useCurrentUser()
	
	useEffect(() => {
		const io = IO(process.env.NEXT_PUBLIC_API_URL, {
			query: `room=${room.slug}`
		})
		
		// io.on('join', )
	}, [])
	
	return (
		<>
			<Head>
				<link key="api-preconnect" rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
				<title key="title">{room.name} - babble</title>
			</Head>
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
			<LocalVideo />
		</>
	)
}

RoomPage.getInitialProps = async ({ query, res }) => {
	const room = await getRoom(query.slug as string)
	
	if (!room && res)
		res.statusCode = 404
	
	return {
		room,
		owner: room && await getUser(room.owner)
	}
}

export default RoomPage
