import { setProductData } from './set-product-data'
import { setProducts } from './set-products'

export const saveProductAsync = (id, newProductData, products) => async (dispatch) => {
	try {
		fetch(`/api/products/${id}/edit`, {
			method: 'PATCH',
			body: newProductData,
			credentials: 'include',
		}).then(res => res.json()).then(({updatedProduct}) => {
			dispatch(setProductData(updatedProduct))
			dispatch(setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p)))

		})
	} catch (err) {
		console.error('product edit error:', err)
		throw err
	}
}
