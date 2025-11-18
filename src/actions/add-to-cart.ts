import { ACTION_TYPE } from "./action-types"

export const addToCart = (productData) => ({
    type: ACTION_TYPE.ADD_TO_CART,
    payload: productData
})