import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { io as IO } from 'socket.io-client'
import { toast } from 'react-toastify'

import NotFound from 'pages/404'
import Room from 'models/Room'
import User from 'models/User'
import SocketUserData from 'models/SocketUserData'
import getRoom from 'lib/getRoom'
import getUser from 'lib/getUser'
import useCurrentUser from 'hooks/useCurrentUser'
import Header from 'components/RoomHeader'

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
			<Header
				className={styles.header}
				currentUser={currentUser}
				room={room}
				owner={owner}
			/>
			<div className={styles.container}>
				{users
					? (
						<div className={styles.users}>
							{users.map(user => (
								<p key={user.id} className={styles.user}>
									{user.data?.name ?? 'anonymous'}
								</p>
							))}
						</div>
					)
					: <p className={styles.loading}>joining...</p>
				}
			</div>
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
