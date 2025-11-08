import { ACTION_TYPE } from "./action-types";

export const removeFromCombiner = (productId) => ({
	type: ACTION_TYPE.REMOVE_FROM_COMBINER,
	payload: productId,
})