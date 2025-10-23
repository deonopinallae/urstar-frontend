import { ACTION_TYPE } from "../actions"

const initialState: stateTypes = {
	id: '',
	imageUrl: '',
	name: '',
	type: '',
	brand: '',
	category: '',
	price: '',
	description: '',
	rating: '',
	reviews: [],
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_DATA: {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state
	}
}

interface stateTypes {
	id: string,
	imageUrl: string,
	name: string,
	type: string,
	brand: string,
	category: string,
	price: string,
	description: string,
	rating: string,
	reviews: object[]
}
