import { request } from '../utils'
import { addToCombiner } from './add-to-combiner'
import { setUser } from './set-user'

export const addToCombinerAsync = (userId, productData: object) => (dispatch) =>
	request(`/api/users/${userId}/combiner`, 'POST',  productData)
		.then(({data}) => {
			dispatch(setUser(data))
			return data
		})
