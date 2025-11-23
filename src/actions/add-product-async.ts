import { request } from '../utils'
import { addProduct } from './add-product'

export const addProductAsync = (form: FormData) => (dispatch) => 
	request('/api/products/add-product', 'POST', form, true).then(({data}) => {
		dispatch(addProduct(data))
		return(data)
	})

