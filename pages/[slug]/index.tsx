import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { io as IO } from 'socket.io-client'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import NotFound from 'pages/404'
import Room from 'models/Room'
import User from 'models/User'
import SocketUserData from 'models/SocketUserData'
import getRoom from 'lib/getRoom'
import getUser from 'lib/getUser'
import { requestAudio } from 'lib/media'
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
	
	const [users, setUsers] = useState<SocketUserData[] | null>(null)
	
	useEffect(() => {
		if (currentUser === undefined)
			return
		
		let _users: SocketUserData[] = []
		
		const io = IO(process.env.NEXT_PUBLIC_API_URL, {
			query: {
				uid: currentUser?.uid,
				room: room.slug
			}
		})
		
		io.on('users', (users: SocketUserData[]) => {
			_users = users
			setUsers(users)
		})
		
		io.on('join', (id: string, users: SocketUserData[]) => {
			toast.dark(`${users.find(user => user.id === id)?.data?.name ?? 'anonymous'} joined`)
			
			_users = users
			setUsers(users)
		})
		
		io.on('leave', (id: string, users: SocketUserData[]) => {
			toast.dark(`${_users.find(user => user.id === id)?.data?.name ?? 'anonymous'} left`)
			
			_users = users
			setUsers(users)
		})
		
		return () => io.disconnect()
	}, [currentUser, room.slug, setUsers])
	
	return (
		<main className={styles.root}>
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
			{users
				? users.map(user => (
					<></>
				))
				: <p className={styles.loading}>joining...</p>
			}
		</main>
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
