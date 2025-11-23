import { request } from '../utils'
import { addProduct } from './add-product'

export const addProductAsync = (productData) => (dispatch) =>
	request(`/api/products/add-product`, 'POST', { productData }).then(({data}) => {
		dispatch(addProduct(data))
		return data
	})
