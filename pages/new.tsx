import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import Input from 'components/Input'
import TextAreaWithLabel from 'components/TextAreaWithLabel'

import styles from 'styles/New.module.scss'

const NewRoomPage: NextPage = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	
	return (
		<>
			<Head>
				<title key="title">create room - babble</title>
			</Head>
			<h1 className={styles.title}>create room</h1>
			<form>
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
			</form>
		</>
	)
}

export default NewRoomPage
