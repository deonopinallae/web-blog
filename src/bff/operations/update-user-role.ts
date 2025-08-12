import { setUserRole } from '../api'
import { ROLE } from '../../constants'
import { sessions } from '../sessions'

export const updateUserRole = async (userSession, userId, newUserRole) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessRoles))
		return { error: 'доступ запрещён', res: null }

	setUserRole(userId, newUserRole)

	return {
		error: null,
		res: true,
	}
}
