import { sessions } from '../sessions'
import { getRoles } from '../api'
import { ROLE } from '../../constants'

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessRoles))
		return { error: 'доступ запрещён', res: null }

	const roles = await getRoles()

	return {
		error: null,
		res: roles,
	}
}
