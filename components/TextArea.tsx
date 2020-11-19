import { ChangeEvent, TextareaHTMLAttributes, useCallback } from 'react'
import _TextArea from 'react-textarea-autosize'
import cx from 'classnames'

import styles from 'styles/TextArea.module.scss'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	setValue?(value: string): void
}

const TextArea = ({ className, setValue, ...props }: TextAreaProps) => {
	const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		setValue?.(event.target.value)
	}, [setValue])
	
	return (
		<_TextArea
			className={cx(styles.root, className)}
			minRows={3}
			onChange={onChange}
			{...props as any}
		/>
	)
}

export default TextArea
