import { useState } from 'react'
import cx from 'classnames'

import newId from 'lib/newId'
import TextArea, { TextAreaProps } from './TextArea'

import styles from 'styles/TextAreaWithLabel.module.scss'

export interface TextAreaWithLabelProps extends TextAreaProps {
	label: string
}

const TextAreaWithLabel = ({ className, label, ...props }: TextAreaWithLabelProps) => {
	const [id] = useState(newId)
	
	return (
		<div className={cx(styles.root, className)}>
			<TextArea className={styles.text} id={id} {...props} />
			<label className={styles.label} htmlFor={id}>{label}</label>
		</div>
	)
}

export default TextAreaWithLabel
