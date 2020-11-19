import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Search from './Search'
import AuthButton from './AuthButton'

import styles from 'styles/Navbar.module.scss'

const Navbar = () => (
	<div className={styles.root}>
		<nav className={styles.content}>
			<Link href="/">
				<a className={styles.home}>babble</a>
			</Link>
			<Search className={styles.search} />
			<Link href="/new">
				<a className={styles.new}>
					<FontAwesomeIcon className={styles.newIcon} icon={faPlus} />
					create room
				</a>
			</Link>
			<AuthButton className={styles.auth} />
		</nav>
	</div>
)

export default Navbar
