import { request } from '../utils'
import { addToFavorites } from './add-to-favorites'

export const addToFavoritesAsync = (userId, productId) => async (dispatch) =>
	request(`/api/users/${userId}/favorites`, 'POST',  {productId})
		.then(({product}) => {
			dispatch(addToFavorites(product))		
		})
