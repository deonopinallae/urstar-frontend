import { request } from '../utils'
import { addToCart } from './add-to-cart'

export const addToCartAsync = (userId, productData) => (dispatch) =>
	request(`/api/users/${userId}/cart`, 'POST', { productData }).then(
		(productInCart) => {
			dispatch(addToCart(productInCart.data))
			return productInCart.data
		},
	)
