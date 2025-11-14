import { ACTION_TYPE } from '../actions'
import { ROLE } from '../constants'

const initialUserState = {
	id: '',
	login: '',
	roleId: ROLE.GUEST,
	registeredAt: '',
	inCart: [],
	favorites: [],
	combinerProducts: [],
	outfits: [],
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
				inCart: [...state.inCart, action.payload],
			}
		}
		case ACTION_TYPE.ADD_TO_COMBINER: {
			return {
				...state,
				combinerProducts: [...state.combinerProducts, action.payload],
			}
		}
		case ACTION_TYPE.REMOVE_FROM_COMBINER:
			return {
				...state,
				combinerProducts: state.combinerProducts.filter(
					(p) => p.id !== action.payload,
				),
			}
		case ACTION_TYPE.SAVE_OUTFIT: {
			return {
				...state,
				outfits: [...state.outfits, action.payload],
			}
		}
		case ACTION_TYPE.SET_OUTFITS: {
			return {
				...state,
				outfits: action.payload,
			}
		}
		case ACTION_TYPE.LOGOUT:
			return initialUserState
		default:
			return state
	}
}
