import { request } from '../utils'
import { setProductData } from './set-product-data'
import { setProducts } from './set-products'

export const saveProductAsync = (id, newProductData, products) => async (dispatch) => {
	const isFormData = true
	request(`/api/products/${id}/edit`, 'PATCH', { newProductData }, isFormData)
		.then(({ updatedProduct }) => {
			dispatch(setProductData(updatedProduct))
			dispatch(
				setProducts(
					products.map((p) =>
						p.id === updatedProduct.id ? updatedProduct : p,
					),
				),
			)
		})
}
