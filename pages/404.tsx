import { NextPage } from 'next'
import Head from 'next/head'

import styles from 'styles/404.module.scss'

const NotFound: NextPage = () => (
	<main className={styles.root}>
		<Head>
			<title key="title">404 - babble</title>
		</Head>
		<h1 className={styles.title}>404</h1>
	</main>
)

export default NotFound
