import { ACTION_TYPE } from './action-types'
import { server } from '../bff'

export const logout = (sessions) => {
     server.logout(sessions)
	return { type: ACTION_TYPE.LOGOUT }
}
