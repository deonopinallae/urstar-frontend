import { request } from "../utils"
import { removeFromFavorites } from "./remove-from-favorites"

export const removeFromFavoritesAsync = (userId, productId) => async (dispatch) => {
	request(`/api/users/${userId}/favorites/${productId}`, 'DELETE').then(({ data }) => {
		dispatch(removeFromFavorites(data))
	})
}
