import { NextPage } from 'next'
import Head from 'next/head'

import styles from 'styles/Home.module.scss'

const Home: NextPage = () => (
	<main className={styles.root}>
		<Head>
			<title key="title">babble</title>
		</Head>
		<h1 className={styles.title}>
			babble: find a room
		</h1>
	</main>
)

export default Home
