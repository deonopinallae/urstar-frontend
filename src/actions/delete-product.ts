import { ACTION_TYPE } from "./action-types"

export const deleteProduct = (productId) => ({
	type: ACTION_TYPE.DELETE_PRODUCT,
	payload: productId,
})