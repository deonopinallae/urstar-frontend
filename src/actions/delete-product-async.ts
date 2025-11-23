import { request } from '../utils'
import { deleteProduct } from './delete-product'

export const deleteProductAsync = (productId) => (dispatch) => {
	request(`/api/products/${productId}`, 'DELETE').then(() => {
		dispatch(deleteProduct(productId))
	})
}
