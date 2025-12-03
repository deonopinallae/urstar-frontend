import { ACTION_TYPE } from '../actions'

const initialState = {
	id: '',
	imageUrl: '',
	name: '',
	type: '',
	brand: '',
	category: '',
	price: '',
	description: '',
	reviews: [],
	size: ''
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_DATA: {
			return {
				...state,
				...action.payload,
			}
		}

		case ACTION_TYPE.SET_REVIEW: {
			return {
				...state,
				reviews: [action.payload, ...state.reviews]
			}
		}
		case ACTION_TYPE.DELETE_REVIEW: {
			return {
				...state,
				reviews: state.reviews.filter((review) => review.id !== action.payload)
			}
		}
		default:
			return state
	}
}

