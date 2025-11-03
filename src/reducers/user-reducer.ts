import { ACTION_TYPE } from '../actions'
import { ROLE } from '../constants'

const initialUserState = {
	id: '',
	login: '',
	roleId: ROLE.GUEST,
	inCart: [],
	favorites: [],
	toCombine: [],
}

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			}
		}
		case ACTION_TYPE.ADD_TO_CART: {
			return {
				...state,
				inCart: [...state.inCart, ...action.payload],
			}
		}
		case ACTION_TYPE.LOGOUT:
			return initialUserState
		default:
			return state
	}
}
