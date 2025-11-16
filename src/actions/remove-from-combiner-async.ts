import { request } from "../utils"
import { removeFromCombiner } from "./remove-from-combiner"

export const removeFromCombinerAsync = (userId, productId) => async (dispatch) => {
	request(`/api/users/${userId}/combiner/${productId}`, 'DELETE').then(({ data }) => {
		dispatch(removeFromCombiner(data))
	})
}
