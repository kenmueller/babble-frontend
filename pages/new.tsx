import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'

import getUid from 'lib/getUid'
import createRoom from 'lib/createRoom'
import getSlug from 'lib/getRoomSlug'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import TextAreaWithLabel from 'components/TextAreaWithLabel'
import SaveButton from 'components/SaveButton'

import styles from 'styles/New.module.scss'

const NewRoomPage: NextPage = () => {
	const currentUser = useCurrentUser()
	
	const [slug, setSlug] = useState<string | null>(null)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [isSlugLoading, setIsSlugLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	
	const save = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (currentUser === undefined || !slug || !name || isSlugLoading || isLoading)
			return
		
		try {
			setIsLoading(true)
			
			const uid = await getUid(currentUser)
			
			if (!uid)
				return setIsLoading(false)
			
			await createRoom(slug, { name, description, uid })
			Router.push(`/${slug}`)
		} catch ({ message }) {
			toast.error(message)
		}
	}, [currentUser, slug, name, description, isSlugLoading, isLoading, setIsLoading])
	
	useEffect(() => {
		if (!name)
			return setSlug(undefined)
		
		let shouldContinue = true
		
		setIsSlugLoading(true)
		getSlug(name)
			.then(slug => shouldContinue && setSlug(slug))
			.catch(({ message }) => shouldContinue && toast.error(message))
			.finally(() => shouldContinue && setIsSlugLoading(false))
		
		return () => { shouldContinue = false }
	}, [name, setSlug, setIsSlugLoading])
	
	return (
		<>
			<Head>
				<title key="title">create room - babble</title>
			</Head>
			<h1 className={styles.title}>create room</h1>
			<form onSubmit={save}>
				<Input
					className={styles.nameInput}
					label="name"
					placeholder="coder club"
					value={name}
					setValue={setName}
				/>
				<TextAreaWithLabel
					className={styles.descriptionInput}
					label="description"
					placeholder="only for ~extreme~ coders"
					value={description}
					setValue={setDescription}
				/>
				{slug && (
					<>
						<label className={styles.linkLabel}>
							{isSlugLoading ? 'loading...' : 'link'}
						</label>
						<p className={styles.link}>
							babble.sh/<span className={styles.slug}>{slug}</span>
						</p>
					</>
				)}
				<SaveButton
					className={styles.saveButton}
					loading={isLoading}
					disabled={currentUser === undefined || !slug || !name || isSlugLoading || isLoading}
				/>
			</form>
		</>
	)
}

export default NewRoomPage
