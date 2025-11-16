import { ACTION_TYPE } from "./action-types"

export const deleteOutfit = (productId) => ({
	type: ACTION_TYPE.DELETE_OUTFIT,
	payload: productId,
})