import { useEffect } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import ProgressBar from 'nextjs-progressbar'

import registerServiceWorker from 'lib/registerServiceWorker'
import Navbar from 'components/Navbar'

import 'styles/global.scss'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		if ('serviceWorker' in navigator)
			registerServiceWorker()
	}, [])
	
	return (
		<>
			<Head>
				<link key="fonts-googleapis-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />
				<link key="fonts-gstatic-preconnect" rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					key="muli-font"
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Muli:wght@400;700;900&display=swap"
				/>
			</Head>
			<ProgressBar color="white" />
			<Navbar />
			<Component {...pageProps} />
		</>
	)
}

export default App
