import { ACTION_TYPE } from '../actions'

const initialAppState = {
	users: [],
	roles: [],
	// modal: {
	// 	isOpen: false,
	// 	text: '',
	// 	onConfirm: () => {},
	// 	onCancel: () => {},
	// },
}

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USERS:
			return {
				...state,
				users: action.payload
			}
		case ACTION_TYPE.SET_ROLES:
			return {
				...state,
				roles: action.payload

			}
		// case ACTION_TYPE.OPEN_MODAL:
		// 	return {
		// 		...state,
		// 		modal: {
		// 			...state.modal,
		// 			...action.payload,
		// 			isOpen: true,
		// 		},
		// 	}
		// case ACTION_TYPE.CLOSE_MODAL:
		// 	return initialAppState
		default:
			return state
	}
}
