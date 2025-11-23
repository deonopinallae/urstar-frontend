import { ACTION_TYPE } from "./action-types"

export const addProduct = (product) => ({
    type: ACTION_TYPE.ADD_PRODUCT,
    payload: product
})