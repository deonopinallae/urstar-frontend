import { request } from '../utils'
import { setProducts } from './set-products'

export const loadProductsAsync = () => (dispatch) =>
	request(`/api/products`).then((products) => {
		if (products) {
			dispatch(setProducts(products))
		}
		return products
	})
