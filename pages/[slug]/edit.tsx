import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { toast } from 'react-toastify'

import NotFound from 'pages/404'
import Room from 'models/Room'
import getRoom from 'lib/getRoom'
import signIn from 'lib/signIn'
import editRoom from 'lib/editRoom'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import TextAreaWithLabel from 'components/TextAreaWithLabel'
import SaveButton from 'components/SaveButton'

import styles from 'styles/EditRoom.module.scss'

interface EditRoomPageProps {
	room: Room | null
}

const EditRoomPage: NextPage<EditRoomPageProps> = ({ room }) => {
	if (!room)
		return <NotFound />
	
	const currentUser = useCurrentUser()
	
	const [name, setName] = useState(room.name)
	const [description, setDescription] = useState(room.description)
	const [isLoading, setIsLoading] = useState(false)
	
	const save = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (!(room && currentUser && currentUser.uid === room.owner))
			return
		
		setIsLoading(true)
		
		try {
			await editRoom(room.slug, { name, description })
			Router.push(`/${room.slug}`)
		} catch ({ message }) {
			toast.error(message)
			setIsLoading(false)
		}
	}, [room, currentUser, name, description, setIsLoading])
	
	useEffect(() => {
		if (!room || currentUser === undefined)
			return
		
		if (currentUser === null) {
			signIn()
			return
		}
		
		if (currentUser.uid === room.owner)
			return
		
		toast.error(`You do not have permission to edit ${room.name}`)
		Router.push(`/${room.slug}`)
	}, [room, currentUser])
	
	return (
		<>
			<Head>
				<title key="title">edit {room.name} - babble</title>
			</Head>
			<label className={styles.title}>edit room</label>
			<Link href={`/${room.slug}`}>
				<a className={styles.name}>{room.name}</a>
			</Link>
			<form onSubmit={save}>
				<Input
					className={styles.nameInput}
					label="name"
					required
					placeholder={room.name}
					value={name}
					setValue={setName}
				/>
				<TextAreaWithLabel
					className={styles.descriptionInput}
					label="description"
					placeholder={`tell us about ${name}`}
					value={description}
					setValue={setDescription}
				/>
				<SaveButton className={styles.saveButton} loading={isLoading} disabled={!name} />
			</form>
		</>
	)
}

EditRoomPage.getInitialProps = async ({ query, res }) => {
	const room = await getRoom(query.slug as string)
	
	if (!room && res)
		res.statusCode = 404
	
	return { room }
}

export default EditRoomPage
