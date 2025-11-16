import { ACTION_TYPE } from "./action-types"

export const setCombinerProducts = (products) => ({
    type: ACTION_TYPE.SET_PRODUCTS,
    payload: products
})
