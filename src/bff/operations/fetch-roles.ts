import { sessions } from '../sessions'
import { getRoles } from '../api'
import { ROLE } from '../../constants'

export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles))
		return { error: 'доступ запрещён', res: null }

	const roles = await getRoles()

	return {
		error: null,
		res: roles,
	}
}
