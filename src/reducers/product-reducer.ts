import { ACTION_TYPE } from '../actions'

const initialState: stateTypes = {
	id: null,
	imageUrl: null,
	name: null,
	type: null,
	brand: null,
	category: null,
	price: null,
	description: null,
	reviews: null,
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_DATA: {
			return {
				...state,
				...action.payload,
			}
		}
		default:
			return state
	}
}

interface stateTypes {
	id: string | null
	imageUrl: string | null
	name: string | null
	type: string | null
	brand: string | null
	category: string | null
	price: string | null
	description: string | null
	reviews: object[] | null
}
