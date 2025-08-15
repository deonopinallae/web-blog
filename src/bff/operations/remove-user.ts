import { sessions } from '../sessions'
import { ROLE } from '../../constants'
import { deleteUser } from '../api/delete-user'

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles))
		return { error: 'доступ запрещён', res: null }

	deleteUser(userId)

	return {
		error: null,
		res: true,
	}
}
