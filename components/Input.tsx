import { useCallback, ChangeEvent, useState } from 'react'
import cx from 'classnames'

import newId from 'lib/newId'

import styles from 'styles/Input.module.scss'

export interface InputProps {
	className?: string
	label: string
	required?: boolean
	placeholder: string
	value: string
	setValue(value: string): void
}

const Input = ({ className, label, required, placeholder, value, setValue }: InputProps) => {
	const [id] = useState(newId)
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}, [setValue])
	
	return (
		<div className={cx(styles.root, className)}>
			<input
				className={styles.input}
				id={id}
				required={required}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor={id}>{label}</label>
		</div>
	)
}

export default Input
