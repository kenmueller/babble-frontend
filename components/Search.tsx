import { useState, useCallback, ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import styles from 'styles/Search.module.scss'

export interface SearchProps {
	className?: string
}

const Search = ({ className }: SearchProps) => {
	const [query, setQuery] = useState('')
	
	const onQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}, [setQuery])
	
	return (
		<form className={cx(styles.root, className)}>
			<input
				className={styles.input}
				placeholder="find a room"
				value={query}
				onChange={onQueryChange}
			/>
			<FontAwesomeIcon className={styles.inputIcon} icon={faSearch} />
			<button className={styles.button}>
				<FontAwesomeIcon className={styles.buttonIcon} icon={faArrowRight} />
			</button>
		</form>
	)
}

export default Search
