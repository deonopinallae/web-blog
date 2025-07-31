import { createSession } from './createSession'
import { getUser } from './getUser'
import { addUser } from './addUser'

export const server = {
	async authorize(authLogin, authPassword) {
        const user = await getUser(authLogin)
        
		if (!user) return { error: 'такой пользователь не найден', res: null }

		if (authPassword !== user.password)
			return { error: 'не верный пароль', res: null }

		return {
			error: null,
			res: createSession(user.role_id),
		}
	},

	async register(regLogin, regPassword) {
        const user = await getUser(regLogin)

		if (user) return { error: 'такой логин уже занят', res: null }

		await addUser(regLogin, regPassword) 

		return {
			error: null,
			res: createSession(user.role_id),
		}
	},
}
