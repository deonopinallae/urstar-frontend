import { ACTION_TYPE } from "./action-types";

export const removeFromCart = (productData) => ({
	type: ACTION_TYPE.REMOVE_FROM_CART,
	payload: productData,
})