import { ACTION_TYPE } from "../bff/actions/action-types"

const initialState: stateTypes = {
	id: '',
	imageUrl: '',
	name: '',
	type: '',
	brand: '',
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
	price: string,
	description: string,
	rating: string,
	reviews: Array<string>
}
