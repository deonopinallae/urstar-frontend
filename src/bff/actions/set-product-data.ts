import { ACTION_TYPE } from './action-types'

export const setProductData = (productData) => ({
    type: ACTION_TYPE.SET_PRODUCT_DATA,
    payload: productData
})