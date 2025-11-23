import { ACTION_TYPE } from '../actions'

const initialState: object = {
	products: [],
}

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS: {
			return {
				...state,
				products: [...action.payload],
			}
		}
		case ACTION_TYPE.ADD_PRODUCT: {
			return {
				...state,
				products: [...state.products, action.payload],
			}
		}
		case ACTION_TYPE.DELETE_PRODUCT: {
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.payload),
			}
		}
		default:
			return state
	}
}
