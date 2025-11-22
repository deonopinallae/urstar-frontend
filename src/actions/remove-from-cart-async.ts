import { request } from "../utils"
import { removeFromCart } from "./remove-from-cart"

export const removeFromCartAsync = (userId, productId, size) => async (dispatch) => {
	request(
		`/api/users/${userId}/cart/${productId}`,
		'DELETE',
		{ size }
	).then(() => dispatch(removeFromCart({ productId, size })))
}
