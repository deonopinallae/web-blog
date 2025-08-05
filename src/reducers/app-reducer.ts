import { ACTION_TYPE } from '../actions'

const initialPostState = {
	wasLogout: false,
}

export const appReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			}
		default:
			return state
	}
}
