import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import ProgressBar from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'

import Navbar from 'components/Navbar'

import 'styles/global.scss'

config.autoAddCss = false

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
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
		<ToastContainer />
	</>
)

export default App
