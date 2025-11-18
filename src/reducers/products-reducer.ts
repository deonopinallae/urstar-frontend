import { ACTION_TYPE } from '../actions'

const initialState: object = {
	products: []
}

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS: {
			return {
				...state,
				products: [...action.payload],
			}
		}
		default:
			return state
	}
}