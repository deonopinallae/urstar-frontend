import { ACTION_TYPE } from '../actions'

const initialState = {
    id: null,
    author: null,
    imageUrl: null,
    name: null,
}

export const outfitReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_OUTFIT_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state
    }
}
