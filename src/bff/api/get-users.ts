import { transformUser } from '../transformers'

export const getUsers = () =>
	fetch('http://localhost:3000/users')
		.then((loadedUser) => loadedUser.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser))
