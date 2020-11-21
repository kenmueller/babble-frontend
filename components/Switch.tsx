import { useCallback, ChangeEvent } from 'react'
import cx from 'classnames'

import styles from 'styles/Switch.module.scss'

export interface SwitchProps {
	className?: string
	label: string
	isDisabled: boolean
	isOn: boolean
	setIsOn(isOn: boolean): void
}

const Switch = ({ className, label, isDisabled, isOn, setIsOn }: SwitchProps) => {
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setIsOn(event.target.checked)
	}, [setIsOn])
	
	return (
		<label
			className={cx(styles.root, className)}
			aria-disabled={isDisabled}
		>
			<input
				className={styles.input}
				type="checkbox"
				disabled={isDisabled}
				checked={isOn}
				onChange={onChange}
			/>
			<span className={styles.slider} />
			<span className={styles.label}>{label}</span>
		</label>
	)
}

export default Switch
