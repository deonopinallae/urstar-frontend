import { request } from '../utils'
import { addToCombiner } from './add-to-combiner'

export const addToCombinerAsync = (userId, productId) => (dispatch) =>
	request(`/api/users/${userId}/combiner`, 'POST',  {productId})
		.then(({product}) => {
			dispatch(addToCombiner(product))		
		})
