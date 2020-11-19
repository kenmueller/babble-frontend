let id = 0

const newId = (prefix: string = '_') =>
	`${prefix}${id++}`

export default newId
