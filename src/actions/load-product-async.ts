import { request } from '../utils'
import { setProductData } from './set-product-data'

export const loadProductAsync = (productId) => (dispatch) => 
	request(`/api/products/${productId}`).then(({data: productData}) => {
		if (!productData) {
			throw new Error('product not found')
		}
		dispatch(setProductData(productData))
		return productData
	})
