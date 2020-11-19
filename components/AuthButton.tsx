import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import cx from 'classnames'

import signIn from 'lib/signIn'
import getUser from 'lib/getUser'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/AuthButton.module.scss'

export interface AuthButtonProps {
	className?: string
}

const AuthButton = ({ className }: AuthButtonProps) => {
	const currentUser = useCurrentUser()
	
	const [slug, setSlug] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = useCallback(async () => {
		if (isLoading || currentUser !== null)
			return
		
		try {
			setIsLoading(true)
			await signIn()
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}, [currentUser, isLoading, setIsLoading])
	
	useEffect(() => {
		if (isLoading || !currentUser)
			return setSlug(null)
		
		getUser(currentUser.uid)
			.then(({ slug }) => setSlug(slug))
			.catch(({ message }) => toast.error(message))
	}, [isLoading, currentUser, setSlug])
	
	return slug
		? (
			<Link href={`/u/${slug}`}>
				<a className={cx(styles.root, className)}>
					{currentUser?.displayName ?? 'anonymous'}
				</a>
			</Link>
		)
		: (
			<button
				className={cx(styles.root, className)}
				disabled={isLoading || currentUser !== null}
				onClick={onClick}
			>
				{isLoading || currentUser !== null
					? 'loading...'
					: 'sign in'
				}
			</button>
		)
}

export default AuthButton
