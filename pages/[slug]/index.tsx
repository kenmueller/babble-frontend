import { NextPage } from 'next'
import Head from 'next/head'

import NotFound from 'pages/404'
import Room from 'models/Room'
import User from 'models/User'
import getRoom from 'lib/getRoom'
import getUser from 'lib/getUser'

export interface RoomPageProps {
	room: Room | null
	owner: User | null
}

const RoomPage: NextPage<RoomPageProps> = ({ room, owner }) => {
	if (!room)
		return <NotFound />
	
	return (
		<>
			<Head>
				<title key="title">{room.name} - babble</title>
			</Head>
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
