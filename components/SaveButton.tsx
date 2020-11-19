import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/SaveButton.module.scss'

export interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading: boolean
}

const SaveButton = ({ loading, className, ...props }: SaveButtonProps) => (
	<button className={cx(styles.root, className)} {...props}>
		{loading
			? 'loading...'
			: (
				<>
					<FontAwesomeIcon className={styles.icon} icon={faSave} />
					save
				</>
			)
		}
	</button>
)

export default SaveButton
