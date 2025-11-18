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
			if (!action.payload) return state
			return {
				...state,
				combinerProducts: [action.payload, ...state.combinerProducts],
			}
		}
		case ACTION_TYPE.REMOVE_FROM_COMBINER:
			return {
				...state,
				combinerProducts: state.combinerProducts.filter(
					(product) => product.id !== action.payload,
				),
			}
		case ACTION_TYPE.SAVE_OUTFIT: {
			return {
				...state,
				outfits: [action.payload, ...state.outfits],
			}
		}
		case ACTION_TYPE.SET_OUTFITS: {
			return {
				...state,
				outfits: action.payload,
			}
		}
		case ACTION_TYPE.DELETE_OUTFIT: {
			return {
				...state,
				outfits: state.outfits.filter(
					(outfit) => outfit.id !== action.payload.id,
				),
			}
		}
		case ACTION_TYPE.ADD_TO_FAVORITES: {
			return {
				...state,
				favorites: [action.payload, ...state.favorites],
			}
		}
		case ACTION_TYPE.REMOVE_FROM_FAVORITES: {
			return {
				...state,
				favorites: state.favorites.filter(
					(product) => product.id !== action.payload,
				),
			}
		}
		case ACTION_TYPE.LOGOUT:
			return initialUserState
		default:
			return state
	}
}
